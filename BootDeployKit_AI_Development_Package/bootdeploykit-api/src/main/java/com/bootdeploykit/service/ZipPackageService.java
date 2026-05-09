package com.bootdeploykit.service;

import com.bootdeploykit.exception.BizException;
import com.bootdeploykit.model.response.GeneratedFile;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class ZipPackageService {
    public byte[] packageFiles(List<GeneratedFile> files) {
        try (ByteArrayOutputStream bytes = new ByteArrayOutputStream();
             ZipOutputStream zip = new ZipOutputStream(bytes, StandardCharsets.UTF_8)) {
            Set<String> seen = new HashSet<>();
            for (GeneratedFile file : files) {
                String path = normalizePath(file.getPath());
                if (!seen.add(path)) {
                    continue;
                }
                zip.putNextEntry(new ZipEntry(path));
                zip.write(file.getContent().getBytes(StandardCharsets.UTF_8));
                zip.closeEntry();
            }
            zip.finish();
            return bytes.toByteArray();
        } catch (IOException ex) {
            throw new BizException("Unable to create ZIP package");
        }
    }

    private String normalizePath(String path) {
        String normalized = path.replace("\\", "/");
        if (normalized.startsWith("/") || normalized.contains("../") || normalized.contains("..\\")) {
            throw new BizException("Invalid generated file path");
        }
        return normalized;
    }
}
