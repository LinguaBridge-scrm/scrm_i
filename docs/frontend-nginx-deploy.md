# 前端宝塔 Nginx 部署配置

适用项目：`cool-admin-vue`

后端服务端口：`8007`

## 问题背景

前端生产包默认通过同域 `/api` 访问后端接口：

```text
/api/admin/base/open/captcha
```

后端真实接口路径是：

```text
/admin/base/open/captcha
```

因此 Nginx 必须把 `/api/` 反向代理到后端，并去掉 `/api` 前缀。

同时前端使用 Vue history 路由，直接刷新页面时需要回退到 `index.html`，否则会出现 404。

## 宝塔推荐配置

在宝塔网站配置中确认 `server` 内包含以下配置。

如果宝塔已经自动生成了 `root`、`index`、SSL 等配置，只需要重点保留 `location /` 和 `location /api/` 两段。

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /www/wwwroot/your-frontend-dist;
    index index.html;

    # Vue history 路由刷新不 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 后端接口反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:8007/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;

        proxy_connect_timeout 3000s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 3000s;
    }
}
```

## 关键点

`proxy_pass` 末尾必须带 `/`：

```nginx
proxy_pass http://127.0.0.1:8007/;
```

这样才能把：

```text
/api/admin/base/open/captcha
```

转发为：

```text
/admin/base/open/captcha
```

不要写成：

```nginx
proxy_pass http://127.0.0.1:8007;
```

否则后端可能收到 `/api/admin/...`，接口会 404。

## 验证命令

先在服务器验证后端接口：

```bash
curl "http://127.0.0.1:8007/admin/base/open/captcha?height=45&width=150&color=%232c3142"
```

正常应返回 `code:1000`，并包含 `captchaId` 和 `data:image/svg+xml;base64,...`。

再验证外网代理：

```bash
curl "https://your-domain.com/api/admin/base/open/captcha?height=45&width=150&color=%232c3142"
```

正常也应返回 `code:1000`。

## 常见问题

### 验证码加载失败

优先检查 `/api/` 反向代理是否生效：

```bash
curl -I "https://your-domain.com/api/admin/base/open/captcha?height=45&width=150&color=%232c3142"
```

如果返回 404、502、宝塔默认页或 HTML 页面，说明 Nginx 代理没有正确转发到后端。

### 直接刷新页面 404

确认存在：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

这是 Vue history 模式必须的配置。

### 后端返回 EACCES 缓存权限错误

这不是 Nginx 问题，是后端运行用户没有权限写入 `.cool-admin` 缓存目录。

推荐给后端设置可写 HOME，例如：

```bash
mkdir -p /www/server/cool-admin-home
chown -R www:www /www/server/cool-admin-home
chmod -R 755 /www/server/cool-admin-home
```

启动后端时带上：

```bash
HOME=/www/server/cool-admin-home NODE_ENV=production node bootstrap.js
```

## 修改后重载

修改宝塔 Nginx 配置后执行：

```bash
nginx -t
nginx -s reload
```

或在宝塔面板中保存配置后重载 Nginx。
