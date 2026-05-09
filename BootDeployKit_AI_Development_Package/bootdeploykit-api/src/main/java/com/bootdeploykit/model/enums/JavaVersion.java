package com.bootdeploykit.model.enums;

public enum JavaVersion {
    JAVA_8("8"),
    JAVA_11("11"),
    JAVA_17("17"),
    JAVA_21("21"),
    JAVA_25("25");

    private final String value;

    JavaVersion(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
