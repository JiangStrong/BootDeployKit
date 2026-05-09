package com.bootdeploykit.service;

import com.bootdeploykit.exception.BizException;
import com.bootdeploykit.model.enums.TemplateType;
import com.bootdeploykit.model.request.GenerateRequest;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    public void validate(GenerateRequest request) {
        if (request.getProject().getLogPath().contains("..")) {
            throw new BizException("logPath must not contain path traversal segments");
        }
        if (request.getProject().getJarFileName().contains("/") || request.getProject().getJarFileName().contains("\\")) {
            throw new BizException("jarFileName must be a file name, not a path");
        }
        TemplateType templateType = request.getTemplateType();
        if (templateType == TemplateType.SPRING_BOOT_MYSQL_REDIS) {
            request.getDatabase().setEnabled(true);
            request.getRedis().setEnabled(true);
        }
        if (templateType == TemplateType.SPRING_BOOT_NGINX) {
            request.getNginx().setEnabled(true);
        }
        if (templateType == TemplateType.SPRING_CLOUD_NACOS) {
            request.getNacos().setEnabled(true);
        }
    }
}
