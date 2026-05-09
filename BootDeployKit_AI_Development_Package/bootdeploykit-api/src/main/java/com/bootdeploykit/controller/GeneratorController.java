package com.bootdeploykit.controller;

import com.bootdeploykit.model.request.GenerateRequest;
import com.bootdeploykit.model.response.GeneratedFile;
import com.bootdeploykit.model.response.PreviewResponse;
import com.bootdeploykit.service.DeploymentGeneratorService;
import com.bootdeploykit.service.ZipPackageService;
import jakarta.validation.Valid;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/generate")
public class GeneratorController {
    private final DeploymentGeneratorService generatorService;
    private final ZipPackageService zipPackageService;

    public GeneratorController(DeploymentGeneratorService generatorService, ZipPackageService zipPackageService) {
        this.generatorService = generatorService;
        this.zipPackageService = zipPackageService;
    }

    @PostMapping("/preview")
    public PreviewResponse preview(@Valid @RequestBody GenerateRequest request) {
        return new PreviewResponse(generatorService.generate(request));
    }

    @PostMapping("/download")
    public ResponseEntity<byte[]> download(@Valid @RequestBody GenerateRequest request) {
        List<GeneratedFile> files = generatorService.generate(request);
        byte[] zip = zipPackageService.packageFiles(files);
        String filename = sanitizeFilename(request.getProject().getProjectName()) + "-deploy-package.zip";
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/zip"))
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(filename).build().toString())
                .body(zip);
    }

    private String sanitizeFilename(String input) {
        return input == null ? "bootdeploykit" : input.replaceAll("[^a-zA-Z0-9._-]", "-");
    }
}
