# 侧边栏菜单国际化说明

本文档说明前端侧边栏动态菜单如何配置中文简体、中文繁体、英文三种语言。

## 实现方式

侧边栏菜单名称来自后端动态菜单接口，后端返回的 `name` 会进入前端菜单项的 `meta.label`。

前端侧边栏渲染时会用 `meta.label` 作为国际化 key：

- 当前语言包存在同名 key：显示翻译后的文案
- 当前语言包不存在同名 key：回退显示后端返回的原始菜单名

搜索菜单时同时匹配翻译后的文案和原始中文菜单名，所以切换语言后仍然可以用中文或当前语言搜索。

## 支持语言

目前只支持项目已有的三种语言：

| 语言 | locale | 语言包文件 |
| --- | --- | --- |
| 中文简体 | `zh-cn` | `src/modules/<模块名>/locales/zh-cn.json` |
| 中文繁体 | `zh-tw` | `src/modules/<模块名>/locales/zh-tw.json` |
| 英文 | `en` | `src/modules/<模块名>/locales/en.json` |

## 新增菜单时如何配置

新增后台菜单后，先确认菜单名称。比如新增菜单名为：

```text
检测记录
```

然后在对应模块的三份语言包中增加同名 key。

如果菜单属于 `customer` 模块，配置：

```jsonc
// src/modules/customer/locales/zh-cn.json
{
  "检测记录": "检测记录"
}
```

```jsonc
// src/modules/customer/locales/zh-tw.json
{
  "检测记录": "檢測記錄"
}
```

```jsonc
// src/modules/customer/locales/en.json
{
  "检测记录": "Detection Records"
}
```

如果菜单属于基础系统模块，配置：

```text
src/modules/base/locales/zh-cn.json
src/modules/base/locales/zh-tw.json
src/modules/base/locales/en.json
```

## 配置规则

1. key 必须和后台菜单名称完全一致，包括空格、斜杠、大小写。
2. 三种语言都要配置，避免不同语言下显示不一致。
3. 如果暂时没有翻译，可以先把 value 写成原菜单名，后续再补。
4. 不需要修改后端菜单表、`menu.json` 或 SQL，只补前端语言包即可。
5. 修改语言包后重新构建前端并发布。

## 示例

后台菜单名称：

```text
平台脚本更新
```

语言包配置：

```jsonc
// zh-cn
"平台脚本更新": "平台脚本更新"
```

```jsonc
// zh-tw
"平台脚本更新": "平台腳本更新"
```

```jsonc
// en
"平台脚本更新": "Platform Script Updates"
```

## 验证方式

1. 登录后台。
2. 点击右上角语言切换。
3. 选择 `中文`、`繁体中文`、`English`。
4. 检查左侧侧边栏菜单是否切换为对应语言。
5. 在侧边栏搜索框分别输入中文菜单名和英文菜单名，确认都能匹配。

## 回退行为

如果某个菜单没有配置语言包，侧边栏会显示后端返回的原始菜单名，不会空白，也不会阻塞页面使用。
