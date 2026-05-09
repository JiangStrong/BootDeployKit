package com.bootdeploykit.service;

import com.bootdeploykit.model.enums.TemplateType;
import com.bootdeploykit.model.request.GenerateRequest;
import com.bootdeploykit.model.response.GeneratedFile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeploymentGeneratorService {
    private final TemplateRenderService renderService;
    private final ValidationService validationService;

    public DeploymentGeneratorService(TemplateRenderService renderService, ValidationService validationService) {
        this.renderService = renderService;
        this.validationService = validationService;
    }

    public List<GeneratedFile> generate(GenerateRequest request) {
        validationService.validate(request);
        Map<String, Object> model = buildModel(request);
        TemplateType type = request.getTemplateType();
        String dir = type.getDirectory();
        List<GeneratedFile> files = new ArrayList<>();

        add(files, "Dockerfile", "dockerfile", dir + "/Dockerfile.ftl", model);
        add(files, "docker-compose.yml", "yaml", dir + "/docker-compose.yml.ftl", model);
        add(files, ".env.example", "bash", dir + "/env.example.ftl", model);
        add(files, "config/application-prod.yml", "yaml", dir + "/application-prod.yml.ftl", model);
        add(files, "scripts/deploy.sh", "bash", dir + "/scripts/deploy.sh.ftl", model);
        add(files, "scripts/restart.sh", "bash", dir + "/scripts/restart.sh.ftl", model);
        add(files, "scripts/logs.sh", "bash", dir + "/scripts/logs.sh.ftl", model);
        if (type == TemplateType.SPRING_BOOT_NGINX) {
            add(files, "nginx/default.conf", "nginx", dir + "/nginx/default.conf.ftl", model);
        }
        if (type == TemplateType.SPRING_CLOUD_NACOS) {
            add(files, "config/gateway-application.yml", "yaml", dir + "/gateway-application.yml.ftl", model);
            add(files, "nacos-docker-compose.yml", "yaml", dir + "/nacos-docker-compose.yml.ftl", model);
        }
        add(files, "README.md", "markdown", dir + "/README.md.ftl", model);
        return files;
    }

    private Map<String, Object> buildModel(GenerateRequest request) {
        Map<String, Object> model = new HashMap<>();
        model.put("templateType", request.getTemplateType().name());
        model.put("project", request.getProject());
        model.put("database", request.getDatabase());
        model.put("redis", request.getRedis());
        model.put("nginx", request.getNginx());
        model.put("nacos", request.getNacos());
        return model;
    }

    private void add(List<GeneratedFile> files, String outputPath, String language, String templatePath, Map<String, Object> model) {
        files.add(new GeneratedFile(outputPath, language, renderService.render(templatePath, model)));
    }
}
