package com.bootdeploykit.controller;

import com.bootdeploykit.model.enums.TemplateType;
import com.bootdeploykit.model.response.TemplateInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/templates")
public class TemplateController {
    @GetMapping
    public List<TemplateInfo> listTemplates() {
        return Arrays.stream(TemplateType.values())
                .map(type -> new TemplateInfo(type.name(), type.getDisplayName(), type.getDescription()))
                .toList();
    }
}
