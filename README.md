<div align="center">
	<h1>TerraMours Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/TerraMours/TerraMours_Admin_Web) ![](https://img.shields.io/github/forks/TerraMours/TerraMours_Admin_Web)

中文简介 | [English](README-EN.md)

## 简介

[TerraMours Admin](https://github.com/TerraMours/TerraMours_Admin_Web) 是基于soybean-admin 开发完善的后台管理系统，技术包括 Vue3、Vite3、TypeScript、NaiveUI、Pinia 和 UnoCSS 等最新流行的前端技术栈，内置丰富的主题配置，有着极高的代码规范，开箱即用，也可用于学习参考。

## 特性

- **最新流行技术栈**：使用 Vue3/Vite 等前端前沿技术开发, 使用高效率的 npm 包管理器 pnpm
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式，基于原子 css 框架 - UnoCss 的动态主题颜色
- **代码规范**：丰富的规范插件及极高的代码规范

## 已开发功能
- **聊天记录**：聊天记录管理，查询使用者会话信息。（todo：1.导出功能2.创建微调模型）
- **敏感词管理**: 敏感词管理，自定义敏感词过滤，加强系统安全
- **Key池管理**：Key池管理，支持管理者添加多个key组成Key池，调用ai接口时轮询，加强稳定性
- **系统提示词**：系统提示词，添加各种角色提示词，让使用者能更好的使用ai对话。


## 在线预览

- [TerraMours Admin 预览地址](https://demo.terramours.site/)

## 文档

- [项目文档地址](https://terramours.site/)




## 更新日志

[CHANGELOG](./CHANGELOG.md)

## 后端服务

- [TerraMours](https://github.com/TerraMours/TerraMours)


## 安装使用

- 环境配置
  **本地环境需要安装 pnpm 7.x 、Node.js 14.18+ 和 Git**

- 克隆代码

```bash
git clone https://github.com/TerraMours/TerraMours_Admin_Web.git
```

- 安装依赖

```bash
pnpm i
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## Docker 部署

```bash
docker build -t terramoursweb -f docker/Dockerfile .
```

- Docker 部署 terramoursweb

```bash
docker run --name terramoursweb -p 80:80 -d terramoursweb/terramoursweb:v0.9.6
```

- 访问 TerraMoursAdmin

打开本地浏览器访问`http://localhost`


## 浏览器支持

本地开发推荐使用`Chrome 90+` 浏览器

支持现代浏览器, 不支持 IE

## 开源作者

[@Raokun](https://github.com/raokun)

## 交流

`TerraMours Admin` 是完全开源免费的项目，在帮助开发者更方便地进行中大型管理系统开发，同时也提供微信和 QQ 交流群，使用问题欢迎在群内提问。

  <div style="display:flex;">
  	<div style="padding-right:24px;">
  		<p>QQ交流群</p>
      <img src="https://www.raokun.top/upload/2023/06/qq.png" style="width:200px" />
  	</div>
		<div>
			<p>添加本人微信，欢迎来技术交流，业务咨询</p>
			<img src="https://www.raokun.top/upload/2023/04/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230405192146.jpg" style="width:180px" />
		</div>
  </div>

## 捐赠

如果你觉得这个项目对你有帮助，可以请 TerraMours 组员喝杯咖啡表示支持，TerraMours 开源的动力离不开各位的支持和鼓励。

  <div style="display:flex;">
  	<div style="padding-right:24px;">
  		<p>微信</p>
      <img src="https://www.raokun.top/upload/2023/04/%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE.jpg" style="width:200px" />
  	</div>
  </div>

## License

[MIT © TerraMours-2023](./LICENSE)
