# ${project.projectName} Spring Cloud Nacos Deployment

This package runs a Spring Cloud application or gateway with a standalone Nacos service.

## Quick Start

1. Put `${project.jarFileName}` in this directory.
2. Copy `.env.example` to `.env`.
3. Change Nacos auth values before production use.
4. Run `chmod +x scripts/*.sh`.
5. Run `./scripts/deploy.sh`.
6. Open the Nacos console at `http://localhost:${nacos.port?c}/nacos`.

## Generated Config

- `docker-compose.yml`: app and Nacos stack
- `nacos-docker-compose.yml`: standalone Nacos compose file
- `config/application-prod.yml`: Spring Cloud Nacos config
- `config/gateway-application.yml`: Gateway route example

## Security Notes

The generated Nacos token and identity values are placeholders. Replace them with strong secrets before production.
