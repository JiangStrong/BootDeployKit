# BootDeployKit

BootDeployKit 是一个面向 Java 后端开发者的在线部署包生成工具。

用户只需要填写项目名称、JAR 包名称、运行端口、域名和中间件配置，系统即可自动生成 Dockerfile、run.sh、docker-compose.yml、Nginx 配置和部署说明，帮助 Spring Boot 项目快速完成服务器部署。

## 在线体验

https://boot-deploy-kit.vercel.app

## 项目定位

很多 Java 后端开发者写完 Spring Boot 项目后，经常卡在部署阶段：

- Dockerfile 不会写
- run.sh 启动脚本不会写
- Nginx 配置容易出错
- docker-compose 配置麻烦
- MySQL、Redis、Nacos 等中间件配置容易混乱
- 新手不知道服务器上该怎么启动项目

BootDeployKit 就是为了解决这个问题。

它可以帮助用户快速生成一套可下载的部署包，让 Java 后端项目更容易上线。

## 功能特性

- 在线填写部署参数
- 自动生成 Dockerfile
- 自动生成 run.sh 启动脚本
- 自动生成 docker-compose.yml
- 自动生成 Nginx 配置
- 自动生成部署说明文档
- 支持自定义项目名称
- 支持自定义 JAR 包名称
- 支持自定义端口
- 支持自定义域名
- 支持 MySQL、Redis、Nacos、Nginx 等配置选项
- 支持下载完整部署 ZIP 包

## 适合人群

- Java 后端开发者
- Spring Boot 项目开发者
- 后端新手
- 需要快速部署个人项目的人
- 不熟悉 Docker / Nginx / Linux 部署流程的人
- 想快速生成部署脚本的人

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel
- JSZip

## 项目结构

```text
BootDeployKit
├── BootDeployKit_AI_Development_Package
│   ├── bootdeploykit-web
│   │   ├── app
│   │   ├── components
│   │   ├── lib
│   │   ├── types
│   │   ├── package.json
│   │   └── next.config.mjs
│   ├── tools
│   └── README.md
├── bootdeploykit_architecture.png
├── bootdeploykit_backend_flow.png
├── bootdeploykit_modules.png
└── README.md
