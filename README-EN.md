<div align="center">
	<h1>TerraMours Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/TerraMours/TerraMours_Admin_Web) ![](https://img.shields.io/github/forks/TerraMours/TerraMours_Admin_Web)

[中文简介](README.md) | English

## Introduction

[TerraMours Admin](https://github.com/TerraMours/TerraMours_Admin_Web) is a backend management system developed based on soybean-admin. The technology stack includes the latest popular front-end technologies like Vue3, Vite3, TypeScript, NaiveUI, Pinia, and UnoCSS, with built-in rich theme configurations, and has high code standards. It's ready to use and can also be used for learning and reference.

## Features

- **Latest Popular Technology Stack**: Develop using cutting-edge front-end technologies like Vue3/Vite, and use the efficient npm package manager pnpm
- **TypeScript**: Language for application-level JavaScript
- **Themes**: Rich configurable themes and dark mode, dynamically changing theme colors based on the atomic CSS framework - UnoCss
- **Code Standards**: Rich standard plugins and high code standards

## Online Preview

- [TerraMours Admin Preview](https://demo.terramours.site/)

## Documentation

- [Project Documentation Address](https://terramours.site/)

## Changelog

[CHANGELOG](./CHANGELOG.md)

## Backend Service

- [TerraMours](https://github.com/TerraMours/TerraMours)

## Installation

- Environment Setup
  **Local environment requires pnpm 7.x, Node.js 14.18+, and Git**

- Clone Code

```bash
git clone https://github.com/TerraMours/TerraMours_Admin_Web.git
```

- Install Dependencies

```bash
pnpm i
```

- Run

```bash
pnpm dev
```

- Build

```bash
pnpm build
```

## Docker Deployment

```bash
docker build -t terramoursweb -f docker/Dockerfile .
```

- Deploy `terramoursweb` in Docker

```bash
docker run --name terramoursweb -p 80:80 -d terramoursweb/terramoursweb:v0.9.6
```

- Access TerraMoursAdmin

Open your local browser and go to `http://localhost`

## Browser Support

Recommended to use the `Chrome 90+` browser for local development

Supports modern browsers, not Internet Explorer

## Open-Source Authors

[@Raokun](https://github.com/raokun)

## Communication

`TerraMours Admin` is a completely open-sourced and free-to-use project that helps developers to more conveniently develop medium to large-scale management systems, and also provides WeChat and QQ communication groups. If you have any questions about usage, please feel free to ask in the group.

  <div style="display:flex;">
  	<div style="padding-right:24px;">
  		<p>QQ Communication Group</p>
      <img src="https://www.raokun.top/upload/2023/06/qq.png" style="width:200px" />
  	</div>
		<div>
			<p>Add me to WeChat for technical exchange and business consultation.</p>
			<img src="https://www.raokun.top/upload/2023/04/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230405192146.jpg" style="width:180px" />
		</div>
  </div>

## Donation

If you find this project helpful, you can buy a drink for the TerraMours team to show your support. The motivation for TerraMours to be open-sourced comes from everyone's support and encouragement.

![Donation](https://www.raokun.top/upload/2023/04/%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE.jpg)

## License

[MIT © TerraMours-2023](./LICENSE)