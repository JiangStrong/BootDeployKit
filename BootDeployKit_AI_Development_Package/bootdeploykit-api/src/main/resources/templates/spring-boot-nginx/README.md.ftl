# ${project.projectName} Nginx Deployment

This package runs a Spring Boot application behind an Nginx reverse proxy.

## Usage

1. Point `${nginx.domain}` to this server.
2. Put `${project.jarFileName}` in this directory.
3. Copy `.env.example` to `.env`.
4. Run `chmod +x scripts/*.sh`.
5. Run `./scripts/deploy.sh`.

## Files

- `nginx/default.conf`: reverse proxy configuration
- `docker-compose.yml`: app and Nginx services
- `config/application-prod.yml`: Spring Boot production profile

## Notes

This v1 template generates HTTP configuration. Add TLS with Certbot or your load balancer before production traffic.
