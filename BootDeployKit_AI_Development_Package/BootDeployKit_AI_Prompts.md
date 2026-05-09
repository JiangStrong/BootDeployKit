# BootDeployKit AI 开发提示词合集

## 总提示词

```text
你现在是一个全栈架构师和高级 Java/Spring Boot + Next.js 工程师。

我要开发一个英文 SEO 工具站，项目名叫 BootDeployKit。

项目定位：
BootDeployKit is a Spring Boot Docker Deployment Generator. It helps Java backend developers generate production-ready Dockerfile, docker-compose.yml, Nginx config, MySQL, Redis, Nacos and Spring Boot application-prod.yml files online.

技术栈：
1. 前端：Next.js App Router + TypeScript + Tailwind CSS
2. 后端：Spring Boot 3.x + Java 17 + FreeMarker
3. 后端负责根据用户输入渲染部署模板，并返回文件预览或 ZIP 下载
4. 第一版不需要数据库
5. 前端需要 SEO 友好，需要 metadata、sitemap.ts、robots.ts
6. 后端需要 CORS、参数校验、全局异常处理

核心功能：
1. 用户选择部署模板
2. 用户填写项目参数
3. 前端调用 POST /api/v1/generate/preview 预览生成文件
4. 前端调用 POST /api/v1/generate/download 下载 ZIP
5. ZIP 中包含 Dockerfile、docker-compose.yml、nginx/default.conf、config/application-prod.yml、scripts/deploy.sh、README.md

支持模板：
1. SPRING_BOOT_BASIC
2. SPRING_BOOT_MYSQL_REDIS
3. SPRING_BOOT_NGINX
4. SPRING_CLOUD_NACOS

请你先输出完整项目目录结构，然后按模块生成代码。
不要省略关键代码。
每个文件都要给出完整路径和完整代码。
先从后端 Spring Boot 项目开始。
```

## 后端提示词

```text
请为 BootDeployKit 生成后端 Spring Boot 项目代码。

要求：
1. 使用 Java 17、Spring Boot 3.x、Maven
2. 包名：com.bootdeploykit
3. 提供以下接口：
   - GET /api/v1/templates
   - POST /api/v1/generate/preview
   - POST /api/v1/generate/download
   - GET /health
4. 使用 FreeMarker 渲染模板
5. 使用 Java ZipOutputStream 生成 ZIP
6. DTO 包括：GenerateRequest、ProjectConfig、DatabaseConfig、RedisConfig、NginxConfig、NacosConfig、PreviewResponse、GeneratedFile、TemplateInfo
7. Service 包括：DeploymentGeneratorService、TemplateRenderService、ZipPackageService、ValidationService
8. 需要全局异常处理 GlobalExceptionHandler
9. 需要 CORS 配置
10. 先生成完整 Maven pom.xml，再生成所有 Java 文件。
```

## 模板提示词

```text
请为 BootDeployKit 后端生成 FreeMarker 模板文件。

模板目录：src/main/resources/templates/

需要支持 4 个模板：
1. spring-boot-basic
2. spring-boot-mysql-redis
3. spring-boot-nginx
4. spring-cloud-nacos

每个模板至少包含 Dockerfile.ftl、docker-compose.yml.ftl、application-prod.yml.ftl、README.md.ftl、deploy.sh.ftl。

spring-boot-nginx 还需要 nginx/default.conf.ftl。
spring-cloud-nacos 还需要 gateway-application.yml.ftl、nacos-docker-compose.yml.ftl。

要求：模板变量来自 GenerateRequest；配置适合生产部署；Docker Compose 使用 bridge network；日志目录做 volume 映射；README.md 包含完整使用步骤；不要写死项目名、端口、域名、数据库账号。
```

## 前端提示词

```text
请为 BootDeployKit 生成前端 Next.js 项目代码。

技术栈：Next.js App Router、TypeScript、Tailwind CSS，不使用复杂 UI 库，保持干净简洁，响应式布局，SEO metadata。

页面：/、/tools/spring-boot-docker-generator、/tools/docker-compose-spring-boot-mysql-redis、/tools/spring-boot-nginx-generator、/tools/spring-cloud-nacos-generator、/blog/spring-boot-docker-deployment、/privacy、/terms、/contact。

组件：DeploymentWizard、ProjectForm、DependencySelector、NginxForm、NacosForm、FilePreview、DownloadButton、FAQSection、RelatedTools。

功能：用户填写参数；Preview Files 调用 /api/v1/generate/preview；显示文件列表和代码内容；Download ZIP 调用 /api/v1/generate/download；每个工具页有独立 title 和 description；生成 app/sitemap.ts 和 app/robots.ts。

请先输出目录结构，再逐个文件生成完整代码。
```

## 部署提示词

```text
请为 BootDeployKit 生成完整部署方案。

需要输出：后端 Dockerfile、后端 docker-compose.yml、Nginx 反向代理配置、前端 Vercel 部署步骤、后端服务器部署步骤、环境变量说明、CORS 配置说明、Google Search Console 提交流程、常见部署错误和解决方法。

项目结构：bootdeploykit-web 是 Next.js 前端；bootdeploykit-api 是 Spring Boot 后端。

后端端口：8080
前端域名：https://bootdeploykit.com
后端 API 域名：https://api.bootdeploykit.com
```
