<div align="center">
	<h1>TerraMours Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/TerraMours/TerraMours_Admin_Web) ![](https://img.shields.io/github/forks/TerraMours/TerraMours_Admin_Web)

[中文简介](README.md) | English

## Introduction

[TerraMours Admin](https://github.com/TerraMours/TerraMours_Admin_Web) is a backend management system developed based on soybean-admin. The technology stack includes the latest popular front-end technologies like Vue3, Vite3, TypeScript, NaiveUI, Pinia, and UnoCSS, with built-in rich theme configurations, and has high code standards. It's ready to use and can also be used for learning and reference.

TerraMours is a practical project that implements user login and features such as multilingual model chat based on SK, multimodal image generation based on chatgpt and SD. The management side includes data dashboards, chat record management, image record management, user management, and system configuration.

Official website: https://terramours.site/

## Features

- **Latest Popular Technology Stack**: Develop using cutting-edge front-end technologies like Vue3/Vite, and use the efficient npm package manager pnpm
- **TypeScript**: Language for application-level JavaScript
- **Themes**: Rich configurable themes and dark mode, dynamically changing theme colors based on the atomic CSS framework - UnoCss
- **Code Standards**: Rich standard plugins and high code standards

## Developed Features
- **Data Dashboard**: Displays multiple data statistics that include several data types most important to management personnel. The charts present statistics on chat and drawing counts across multiple dimensions, divided into three dimensions: daily (segmented by hour), daily, and monthly. The following is the data content for daily statistics.
- **System Management**:
  - **Email Service Configuration**: Configures the API service parameters for system emails used for sending verification codes via email.
  - **GPT Settings**: Configures the proxy address, pricing plan, interface parameters, and KEY pool configuration for GPT.
  - **Image Service Address**: Configures the service address for AI image drawing.
- **Chat Records**: Manages chat records and queries user session information. (todo: 1. Export function, 2. Create fine-tuning model)
- **Sensitive Word Management**: Manages sensitive words and customizes word filtering to enhance system security.
- **Key Pool Management**: Manages the Key pool, allowing administrators to add multiple keys to form a Key pool for improved stability by using a round-robin approach when calling the AI interface.
- **System Prompt Words**: Provides system prompt words for various roles, enabling users to use AI conversation more effectively.
- **Drawing Records**: View the generation records of images in the system.
- **Menu Management**: Implements dynamic configuration of menus in the backend management system. The menu management interface allows setting menus, and the backend API includes basic menu options during initialization.
- **Role Management**: Controls roles in the backend management system. The default roles include Super Administrator and Regular User.
- **User Management**: Manages registered users in the system.
- **Product Management - Product Categories**: Sets the type and classification information for products to facilitate product management.
- **Product Management - Product List**: Sets product information.
- **Order List**: View generated orders.

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



## Quick Setup

### 1. Quick setup of AI chat and drawing system based on docker-compose

#### 1. Create a new empty file named docker-compose.yml

Create a new empty file named docker-compose.yml and paste the following contents into the file, then save it.

```yaml
version: "3.9"
services:
  redis:
    image: redis
    container_name: redis_container
    ports:
      - "6379:6379"
    restart: always
    networks:
      - server

  postgres:
    image: postgres
    container_name: postgres_container
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=terramours1024
      - POSTGRES_DB=TerraMoursGpt
    ports:
      - "5432:5432"
    restart: always
    networks:
      - server

  seq:
    image: datalust/seq
    container_name: seq_container
    environment:
      - ACCEPT_EULA=Y
    ports:
      - "5341:80"
    restart: always
    networks:
      - server

  server:
    image: raokun88/terramours_gpt_server:latest
    container_name: terramours_gpt_server
    environment:
      - TZ=Asia/Shanghai
      - ENV_DB_CONNECTION=Host=postgres;Port=5432;Userid=postgres;password=terramours1024;Database=TerraMoursGpt;
      - ENV_REDIS_HOST=redis:6379
      - ENV_SEQ_HOST=http://<YOUR-SERVER-IP>:5341/
    volumes:
      # 图片挂载地址，将容器中的图片挂载出来
      - /path/terra/images:/app/images
      # 可挂载自定义的配置文件快速进行系统配置
      #- F:\Docker\terra\server/appsettings.json:/app/appsettings.json
    ports:
      - "3116:80"
    restart: always
    networks:
      - server
    depends_on:
      - postgres
      - redis
  admin:
    image: raokun88/terramours_gpt_admin:latest
    container_name: terramoursgptadmin
    environment:
      - VUE_APP_API_BASE_URL=http://<YOUR-SERVER-IP>:3116
    ports:
      - "3226:8081"
    restart: always
    networks:
      - server

  web:
    image: raokun88/terramours_gpt_web:latest
    container_name: terramoursgptweb
    environment:
      - VUE_APP_API_BASE_URL=http://<YOUR-SERVER-IP>:3116
    ports:
      - "3216:8081"
    restart: always
    networks:
      - server

networks:
  server:
    driver:
      bridge

```

##### Installation Notes

1. Edit the yml file: Replace `<YOUR-SERVER-IP>` with your server's IP address.<br/>
2. Default admin account credentials: terramours@163.com terramours@163.com<br/>
3. If there are system errors, check the logs using seq. The log URL is: `http://<YOUR-SERVER-IP>:5341/`<br/>
4. If the seq log displays "Database initialized successfully," it means the backend service has been initialized. There may be error messages during the initial installation. It is recommended to restart the terramours_gpt_server container after completing the docker-compose installation.<br/>
5. For further service configuration, you can copy the appsettings.json file from the server repository and modify the file by mounting it in the container.<br/>
```
# Mount custom configuration file for quick system configuration
- /path/terra/appsettings.json:/app/appsettings.json
```


#### 2. Upload the docker-compose file to the server

Upload the docker-compose file to the server using XFTP, the FTP client I am using.

#### 3. Execute Docker command to build the docker-compose

```shell
docker-compose up
```

### 2. Build the front-end project using Docker command

In addition to using docker-compose, we have also uploaded the front-end image to Docker Hub. You can quickly build the front-end project using the Docker command. Execute the following command on the server:

```shell
docker run --name terramoursgptadmin -p 3226:8081 -e VUE_APP_API_BASE_URL=http://127.0.0.1:3116 --restart always -d raokun88/terramours_gpt_admin:latest //Replace VUE_APP_API_BASE_URL with the corresponding backend API address
```

**Note: Replace VUE_APP_API_BASE_URL with the corresponding backend API address**



## Browser Support

Recommended to use the `Chrome 90+` browser for local development

Supports modern browsers, not Internet Explorer



## Project Screenshots

### User Interface

![image-20231009165939032](./img/image-20231009165939032.png)

![image-20231009165948121](./img/image-20231009165948121.png)

### Admin Interface

![image-20231009170148439](./img/image-20231009170148439.png)

![image-20231009170200187](./img/image-20231009170200187.png)

![image-20231009170507536](./img/image-20231009170507536.png)



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

  <div style="display:flex;">
  	<div style="padding-right:24px;">
  		<p>WeChat</p>
      <img src="https://www.raokun.top/upload/2023/04/%E5%BE%AE%E4%BF%A1%E6%94%B6%E6%AC%BE.jpg" style="width:200px" />
  	</div>
  </div>

## License

[MIT © TerraMours-2023](./LICENSE)
