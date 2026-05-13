# Cool_scrm 部署问题排查记录

最后更新：2026-05-14

适用项目：

- 后端：`cool-admin-midway`
- 前端：`cool-admin-vue`
- 线上后端端口：`8007`

本文用于记录本次部署、注册、Nginx、对外 API 联调中出现过的问题，后续遇到同类现象时优先按本文排查。

## 1. 基础判断规则

### 1.1 先区分返回来源

如果返回 HTML：

```html
<center><h1>404 Not Found</h1></center>
<hr><center>nginx</center>
```

说明请求没有进入后端，优先查 Nginx 转发规则。

如果返回 JSON：

```json
{"code":1001,"message":"登录失效~"}
```

说明请求已经进入后端，继续查 token、参数、业务逻辑。

### 1.2 前端代理和对外 API 不是同一种路径

前端生产环境默认通过 `/api` 请求后端：

```text
/api/admin/base/open/captcha
```

后端真实路由没有 `/api`，真实路径是：

```text
/admin/base/open/captcha
```

所以前端站点需要把 `/api/` 转发到后端并去掉 `/api` 前缀。

对外 API 不走前端 `/api`，应直接保留真实路径：

```text
/app/customer/runtime/heartbeat
/app/customer/translation/translate
```

## 2. 推荐 Nginx 配置

### 2.1 前端站点配置

用于 `cool-admin-vue` 打包后的页面部署。

```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;

    root /www/wwwroot/your-frontend-dist;
    index index.html;

    # Vue history 路由刷新不 404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 前端 /api 转后端真实接口，注意 proxy_pass 末尾必须有 /
    location /api/ {
        proxy_pass http://127.0.0.1:8007/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

关键点：

```nginx
proxy_pass http://127.0.0.1:8007/;
```

这里末尾的 `/` 用于把：

```text
/api/admin/base/open/captcha
```

转成：

```text
/admin/base/open/captcha
```

### 2.2 对外 API 域名配置

用于 `https://capi.flowglot.com/app/customer/**` 这类直接对外提供的后端 API。

```nginx
server {
    listen 80;
    server_name capi.flowglot.com;

    location ^~ /app/ {
        proxy_pass http://127.0.0.1:8007;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /admin/ {
        proxy_pass http://127.0.0.1:8007;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /upload/ {
        proxy_pass http://127.0.0.1:8007;
        proxy_set_header Host $host;
    }
}
```

关键点：

```nginx
proxy_pass http://127.0.0.1:8007;
```

这里末尾不要加 `/`，这样才能保留完整路径：

```text
/app/customer/runtime/heartbeat
```

### 2.3 修改后重载

```bash
nginx -t
nginx -s reload
```

宝塔面板中保存 Nginx 配置后，也要重载 Nginx。

## 3. 问题记录

### 3.1 前端上传后验证码无法加载

现象：

```text
登录页验证码加载失败
```

常见原因：

- 前端生产包请求 `/api/admin/base/open/captcha`
- 后端真实接口是 `/admin/base/open/captcha`
- Nginx 没有正确配置 `/api/` 反向代理
- `proxy_pass` 末尾缺少 `/`，导致后端收到 `/api/admin/...`

处理：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8007/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

验证后端：

```bash
curl "http://127.0.0.1:8007/admin/base/open/captcha?height=45&width=150&color=%232c3142"
```

验证外网：

```bash
curl "https://your-frontend-domain.com/api/admin/base/open/captcha?height=45&width=150&color=%232c3142"
```

正常应返回 `code:1000`，并包含 `captchaId`。

### 3.2 浏览器直接刷新页面 404

现象：

```text
点击菜单正常，直接刷新某个页面返回 404
```

原因：

前端使用 Vue history 路由，Nginx 找不到真实静态文件时需要回退到 `index.html`。

处理：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 3.3 后端启动报 EACCES 缓存权限错误

现象：

```text
EACCES: permission denied, open '/root/.cool-admin/.../cache/diskstore-xxx.lock'
```

原因：

后端运行用户没有权限写入 `HOME` 下的 CoolAdmin 缓存目录。宝塔或 PM2 启动时如果 `HOME` 指向 `/root`，普通运行用户可能无法写入。

处理方式一：给后端设置独立可写 HOME。

```bash
mkdir -p /www/server/cool-admin-home
chown -R www:www /www/server/cool-admin-home
chmod -R 755 /www/server/cool-admin-home
```

启动时带上：

```bash
HOME=/www/server/cool-admin-home NODE_ENV=production node bootstrap.js
```

处理方式二：如果确认后端就是 root 运行，检查 `/root/.cool-admin` 是否存在权限异常。

```bash
ls -la /root/.cool-admin
```

### 3.4 线上注册报 `"billingMode" 不被允许`

现象：

```json
{"code":1001,"message":"\"billingMode\" 不被允许"}
```

原因：

前端已经提交新字段 `billingMode`，但线上后端运行的 DTO 还是旧版本，没有允许该字段。

本地代码已支持：

```text
src/modules/base/dto/tenant-register.ts
src/modules/base/service/sys/tenant-register.ts
```

处理：

先部署后端，再部署前端。

```bash
npm run build
pm2 restart cool-admin --update-env
```

如果用宝塔 Node 项目，重新构建后在宝塔里重启后端项目。

验证线上构建产物：

```bash
grep -R "billingMode" dist/modules/base/dto/tenant-register.js dist/modules/base/service/sys/tenant-register.js
```

有输出才说明线上后端包是新的。

### 3.5 对外 API `/app/customer/runtime/heartbeat` 返回 404

现象：

```text
POST https://capi.flowglot.com/app/customer/runtime/heartbeat
返回 nginx HTML 404
```

已验证现象：

```text
POST /app/customer/login/password              正常进入后端
GET  /app/customer/info/person                 正常进入后端
POST /app/customer/translation/translate       正常进入后端
POST /app/customer/platform/messages/sync      正常进入后端
POST /app/customer/runtime/heartbeat           nginx 404
POST /app/customer/runtime/ports/acquire       nginx 404
```

原因：

不是 token 问题。返回 nginx HTML 404 说明请求没有进入后端，通常是 Nginx 对 `/app/customer/runtime/` 这段路径有单独规则、被拦截，或没有落到统一 `/app/` 转发。

处理：

在 API 域名配置里加统一 `/app/` 转发，并放在 `location /` 前面。

```nginx
location ^~ /app/ {
    proxy_pass http://127.0.0.1:8007;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

验证：

```bash
curl -i -X POST 'https://capi.flowglot.com/app/customer/runtime/heartbeat' \
  -H 'Content-Type: application/json' \
  -d '{"clientId":"test-client","occupiedPorts":0}'
```

正确现象应该不再是 nginx HTML 404，而是后端 JSON，例如：

```json
{"code":1001,"message":"登录失效~"}
```

如果带正确 `Authorization` 后仍 404，再检查线上后端是否包含 runtime controller：

```bash
grep -R "heartbeat" dist/modules/customer/controller/app/runtime.js
```

### 3.6 直接用浏览器访问 POST 接口返回 404

现象：

```text
浏览器打开 /app/customer/runtime/heartbeat 返回 404
```

原因：

浏览器地址栏是 GET 请求，而该接口只支持 POST。

正确请求：

```bash
curl -i -X POST 'https://capi.flowglot.com/app/customer/runtime/heartbeat' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: your-token' \
  -d '{"clientId":"test-client","occupiedPorts":0}'
```

判断：

- GET 返回 404：可能正常，因为没有 GET 路由。
- POST 无 token 返回“登录失效”：路由存在。
- POST 返回 nginx HTML 404：Nginx 没转发到后端。

### 3.7 部分对外 API 正常，部分 404

排查顺序：

1. 确认请求方法是否正确，很多接口只支持 POST。
2. 看返回内容是后端 JSON 还是 nginx HTML。
3. 如果是 nginx HTML，查 Nginx location。
4. 如果是后端 JSON 404，查代码中是否真的有该 controller。
5. 如果本地有、线上没有，重新构建并重启后端。

当前代码中存在的客户侧对外接口：

```text
POST /app/customer/login/password
POST /app/customer/login/refreshToken

GET  /app/customer/info/person
POST /app/customer/info/logout

POST /app/customer/runtime/heartbeat
POST /app/customer/runtime/ports/acquire

POST /app/customer/translation/translate
POST /app/customer/material/list
POST /app/customer/keyword/detect
POST /app/customer/file/upload

POST /app/customer/whatsapp/syncAccount
POST /app/customer/whatsapp/syncConversations
POST /app/customer/whatsapp/pushMessage

POST /app/customer/platform/accounts/sync
POST /app/customer/platform/conversations/sync
POST /app/customer/platform/messages/sync
```

如果请求以下旧文档中出现过但当前 controller 未实现的接口，会 404，需要补后端接口或修正文档：

```text
/app/customer/runtime/ports/release
/app/customer/runtime/ports/active
/app/customer/runtime/ports/history
/app/customer/runtime/sessions/history
/app/customer/runtime/stats
```

### 3.8 注册后后台看不到新租户

现象：

```text
本地注册成功，但管理端看不到注册租户信息
```

当前约定：

- 新注册租户与 `test1234` 是同级。
- 新注册租户不归属到 `test1234`。
- `tenantId` 应等于新用户自己的 `id`。
- 可复制 `test1234` 的可见性字段和角色，避免后台列表看不到。

重点检查字段：

```text
base_sys_user.id
base_sys_user.username
base_sys_user.tenantId
base_sys_user.userId
base_sys_user.departmentId
base_sys_user.billingMode
base_sys_user_role.userId
base_sys_user_role.roleId
```

后端注册服务位置：

```text
cool-admin-midway/src/modules/base/service/sys/tenant-register.ts
```

注册模板账号默认：

```text
test1234
```

可通过环境变量调整：

```bash
REGISTER_TENANT_TEMPLATE_USERNAME=test1234
```

### 3.9 注册不需要输入租户名称

当前约定：

- 注册页不显示“租户名称”。
- 租户名称默认等于登录账号。
- 后端也做兜底：不传 `tenantName` 时使用 `username`。

相关文件：

```text
cool-admin-vue/src/modules/base/pages/login/index.vue
cool-admin-midway/src/modules/base/dto/tenant-register.ts
cool-admin-midway/src/modules/base/service/sys/tenant-register.ts
```

### 3.10 注册计费方式

当前约定：

```text
billingMode = 1  字符计费
billingMode = 0  端口计费
```

注册页默认选择：

```text
字符计费
```

后端默认值：

```text
未传 billingMode 时默认 1
```

如果线上注册报 `"billingMode" 不被允许`，按第 3.4 节处理，先更新后端。

### 3.11 登录和注册切换宽度不一致

现象：

```text
租户登录 / 租户注册切换时宽度不一致，有视觉跳动
```

原因：

注册态原先通过 `.box.is-register` 单独修改了 `.form` 和 `.mode-switch` 宽度。

处理：

- 登录和注册统一使用 `340px` 宽度。
- 增加 `max-width: calc(100vw - 48px)` 兼容移动端。
- 移除注册态单独修改 `.mode-switch` 宽度的逻辑。

相关文件：

```text
cool-admin-vue/src/modules/base/pages/login/index.vue
```

### 3.12 线上素材库后台添加素材后显示失败

现象：

```text
本地开发添加素材正常，线上部署后后台素材库添加素材后图片或视频显示失败
```

素材库后台新增通常有两步：

```text
POST /admin/base/comm/upload
POST /admin/customer/material/add
```

当前线上已验证：

```text
GET  /admin/base/comm/uploadMode      能进入后端
POST /admin/customer/material/add     能进入后端
GET  /upload/not-exist-test.png       能进入后端
```

因此如果不是接口 404，优先检查上传接口返回的素材地址。

常见根因：

后端上传插件默认域名是：

```text
http://127.0.0.1:8007
```

本地开发时浏览器访问 `127.0.0.1` 正常；线上用户浏览器拿到：

```text
http://127.0.0.1:8007/upload/xxx
```

会访问用户自己电脑的 `127.0.0.1`，所以图片或视频显示失败。

处理：

推荐在后端生产配置中固定上传文件公开域名：

```ts
// cool-admin-midway/src/config/config.prod.ts
export default {
  upload: {
    domain: 'https://capi.flowglot.com',
  },
  // ...
};
```

上传插件会优先读取：

```ts
options?.app?.getConfig('upload.domain')
```

如果临时不想改配置文件，也可以用环境变量兜底：

```bash
UPLOAD_DOMAIN=https://capi.flowglot.com
```

修改配置文件后需要重新构建并重启后端。

同时确认 API 域名配置了 `/upload/` 转发：

```nginx
location ^~ /upload/ {
    proxy_pass http://127.0.0.1:8007;
    proxy_set_header Host $host;
}
```

验证：

1. 在浏览器 Network 中找到 `POST /admin/base/comm/upload`。
2. 查看返回值，不应再是：

```text
http://127.0.0.1:8007/upload/...
```

3. 正确应为：

```text
https://capi.flowglot.com/upload/...
```

4. 直接访问该地址，应能打开图片或视频。

如果上传接口直接失败，继续检查后端运行用户是否有上传目录写入权限：

```bash
ls -la /www/server/cool-admin-home/.cool-admin
```

或检查实际运行用户的 HOME：

```bash
echo $HOME
```

### 3.13 线上点击新增跳转到 `/403`

现象：

```text
线上前端在多个后台页面点击新增或提交新增后，页面跳转到 https://scrm.flowglot.com/403
```

定位：

- 前端生产环境响应拦截器原先在任意 API 返回 HTTP 403 时都会执行 `router.push('/403')`。
- 新增按钮本身只打开弹窗，真正触发 403 的通常是提交时的后端接口，例如 `POST /admin/customer/material/add`。
- 后端 `/admin/**` 接口会读取缓存权限 `admin:perms:<userId>`，缺少 `customer:xxx:add` 时返回 403。
- 生产环境 `config.prod.ts` 中 `initMenu=false`，新增菜单和按钮权限不会自动导入生产库。

处理：

1. 前端已调整：API 403 不再整页跳转 `/403`，当前页面只显示接口错误提示。
2. 线上仍需检查角色权限，给对应角色授权实际需要的新增权限。
3. 修改角色权限后重新登录对应账号；如果仍异常，重启后端或清理权限缓存。
4. 如果生产库已有页面菜单但缺新增按钮权限，可执行后端脚本 `sql/customer-add-perms-init.sql`，执行前按实际角色修改脚本里的 `@role_id`。

常见需要检查的新增权限：

```text
customer:material:add
customer:keyword:add
customer:monitor:add
customer:whitelist:add
customer:user:add
customer:translate-service:add
customer:translation:add
customer:port:add
customer:character:add
customer:bill:add
customer:crypto-wallet:add
customer:price-package:add
customer:message:add
```

线上数据库检查：

```sql
SELECT id, parentId, name, router, perms, type
FROM base_sys_menu
WHERE router LIKE '/customer/%'
   OR perms LIKE 'customer:%:add'
ORDER BY parentId, orderNum, id;
```

检查某个角色是否拥有新增权限：

```sql
SELECT rm.roleId, m.name, m.router, m.perms
FROM base_sys_role_menu rm
JOIN base_sys_menu m ON m.id = rm.menuId
WHERE rm.roleId = 角色ID
  AND m.perms LIKE 'customer:%:add';
```

相关文件：

```text
cool-admin-vue/src/cool/service/request.ts
cool-admin-midway/src/modules/base/middleware/authority.ts
cool-admin-midway/src/modules/customer/menu.json
cool-admin-midway/src/config/config.prod.ts
cool-admin-midway/sql/customer-add-perms-init.sql
```

## 4. 部署顺序建议

每次涉及接口参数、DTO、Controller、Service 的改动，按这个顺序部署：

1. 上传后端代码。
2. 后端安装依赖。
3. 后端构建。
4. 重启后端进程。
5. 用 curl 验证后端接口。
6. 再打包并上传前端。
7. 重载 Nginx。

后端常用命令：

```bash
cd /www/wwwroot/your-backend/cool-admin-midway
npm install
npm run build
pm2 restart cool-admin --update-env
```

前端常用命令：

```bash
cd /www/wwwroot/your-frontend/cool-admin-vue
pnpm install
pnpm build
```

Nginx 重载：

```bash
nginx -t
nginx -s reload
```

## 5. 快速验证命令

### 5.1 后端端口是否可用

```bash
curl -i 'http://127.0.0.1:8007/admin/base/open/captcha?height=45&width=150&color=%232c3142'
```

### 5.2 前端代理是否可用

```bash
curl -i 'https://your-frontend-domain.com/api/admin/base/open/captcha?height=45&width=150&color=%232c3142'
```

### 5.3 对外 API 是否进入后端

```bash
curl -i -X POST 'https://capi.flowglot.com/app/customer/translation/translate' \
  -H 'Content-Type: application/json' \
  -d '{"text":"hello","sourceLang":"en","targetLang":"zh"}'
```

无 token 时正常应返回后端 JSON：

```json
{"code":1001,"message":"登录失效~"}
```

### 5.4 runtime heartbeat 是否进入后端

```bash
curl -i -X POST 'https://capi.flowglot.com/app/customer/runtime/heartbeat' \
  -H 'Content-Type: application/json' \
  -d '{"clientId":"test-client","occupiedPorts":0}'
```

正确排查目标：

- 不应该返回 nginx HTML 404。
- 无 token 时应返回后端 JSON。
- 带正确 token 后应返回业务数据。

## 6. 后续维护原则

- 后续凡是本项目部署、注册、Nginx、权限、对外 API、前后端联调相关问题，只要已经定位并解决，都必须追加到本文。
- 发现新部署问题时，优先追加到本文，不要散落在聊天记录里。
- 每次追加时至少写清楚：问题现象、根本原因、处理方式、验证命令或验证结果。
- 对外 API 以 `cool-admin-midway/src/modules/customer/controller/app` 的真实 controller 为准。
- 只要新增对外接口，就同步更新对外 API 文档和本文的接口清单。
- 线上问题先判断返回来源：nginx HTML 还是后端 JSON。
- 前后端同时改接口参数时，必须先部署后端，再部署前端。
