# ${project.projectName} Docker Compose Deployment

This package runs `${project.projectName}` with MySQL and Redis.

## Requirements

- Docker
- Docker Compose v2
- A Spring Boot JAR named `${project.jarFileName}`

## Quick Start

1. Put `${project.jarFileName}` in this directory.
2. Copy `.env.example` to `.env`.
3. Change default database and Redis passwords before production use.
4. Run `chmod +x scripts/*.sh`.
5. Run `./scripts/deploy.sh`.

## Services

- App: `http://localhost:${project.serverPort?c}`
- MySQL: `localhost:${database.port?c}`, database `${database.databaseName}`
- Redis: `localhost:${redis.port?c}`

## Common Issues

- If the app cannot connect to MySQL, wait for the MySQL healthcheck to pass and restart the app.
- If your application uses older Spring Boot Redis properties, rename `SPRING_DATA_REDIS_*` to `SPRING_REDIS_*`.
- Never expose MySQL or Redis ports publicly without firewall rules.
