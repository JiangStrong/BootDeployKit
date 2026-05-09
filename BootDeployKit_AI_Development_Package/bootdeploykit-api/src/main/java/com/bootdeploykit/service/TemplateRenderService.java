package com.bootdeploykit.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.stereotype.Service;

import java.io.StringWriter;
import java.util.Map;

@Service
public class TemplateRenderService {

    private final Configuration configuration;

    public TemplateRenderService(Configuration configuration) {
        this.configuration = configuration;
    }

    public String render(String templatePath, Map<String, Object> model) {
        try {
            Template template = configuration.getTemplate(templatePath);
            StringWriter writer = new StringWriter();
            template.process(model, writer);
            return writer.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to render template: " + templatePath, e);
        }
    }
}
