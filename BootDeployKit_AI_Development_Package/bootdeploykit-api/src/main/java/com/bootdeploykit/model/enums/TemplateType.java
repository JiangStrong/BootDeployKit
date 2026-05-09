package com.bootdeploykit.model.enums;

public enum TemplateType {
    SPRING_BOOT_BASIC(
            "spring-boot-basic",
            "Spring Boot Basic Deployment",
            "Generate Dockerfile, docker-compose.yml and application-prod.yml for a single Spring Boot app."
    ),
    SPRING_BOOT_MYSQL_REDIS(
            "spring-boot-mysql-redis",
            "Spring Boot + MySQL + Redis",
            "Generate a Docker Compose stack for Spring Boot, MySQL and Redis."
    ),
    SPRING_BOOT_NGINX(
            "spring-boot-nginx",
            "Spring Boot + Nginx",
            "Generate Spring Boot Docker deployment files with an Nginx reverse proxy."
    ),
    SPRING_CLOUD_NACOS(
            "spring-cloud-nacos",
            "Spring Cloud Gateway + Nacos",
            "Generate Docker Compose files for Spring Cloud Gateway and Nacos."
    );

    private final String directory;
    private final String displayName;
    private final String description;

    TemplateType(String directory, String displayName, String description) {
        this.directory = directory;
        this.displayName = displayName;
        this.description = description;
    }

    public String getDirectory() {
        return directory;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}
