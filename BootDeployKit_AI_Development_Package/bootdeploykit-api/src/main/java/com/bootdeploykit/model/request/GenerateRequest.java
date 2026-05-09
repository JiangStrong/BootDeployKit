package com.bootdeploykit.model.request;

import com.bootdeploykit.model.enums.TemplateType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class GenerateRequest {
    @NotNull
    private TemplateType templateType = TemplateType.SPRING_BOOT_BASIC;

    @Valid
    @NotNull
    private ProjectConfig project = new ProjectConfig();

    @Valid
    private DatabaseConfig database = new DatabaseConfig();

    @Valid
    private RedisConfig redis = new RedisConfig();

    @Valid
    private NginxConfig nginx = new NginxConfig();

    @Valid
    private NacosConfig nacos = new NacosConfig();

    public TemplateType getTemplateType() {
        return templateType;
    }

    public void setTemplateType(TemplateType templateType) {
        this.templateType = templateType;
    }

    public ProjectConfig getProject() {
        return project;
    }

    public void setProject(ProjectConfig project) {
        this.project = project;
    }

    public DatabaseConfig getDatabase() {
        return database;
    }

    public void setDatabase(DatabaseConfig database) {
        this.database = database;
    }

    public RedisConfig getRedis() {
        return redis;
    }

    public void setRedis(RedisConfig redis) {
        this.redis = redis;
    }

    public NginxConfig getNginx() {
        return nginx;
    }

    public void setNginx(NginxConfig nginx) {
        this.nginx = nginx;
    }

    public NacosConfig getNacos() {
        return nacos;
    }

    public void setNacos(NacosConfig nacos) {
        this.nacos = nacos;
    }
}
