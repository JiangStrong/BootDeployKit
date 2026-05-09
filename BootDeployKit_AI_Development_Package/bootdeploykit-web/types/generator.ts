export type TemplateType =
  | "SPRING_BOOT_BASIC"
  | "SPRING_BOOT_MYSQL_REDIS"
  | "SPRING_BOOT_NGINX"
  | "SPRING_CLOUD_NACOS";

export interface ProjectConfig {
  projectName: string;
  jarFileName: string;
  javaVersion: "8" | "11" | "17" | "21" | "25";
  serverPort: number;
  springProfile: string;
  logPath: string;
  dockerNetwork: string;
}

export interface DatabaseConfig {
  enabled: boolean;
  type: "mysql";
  databaseName: string;
  username: string;
  password: string;
  rootPassword: string;
  port: number;
}

export interface RedisConfig {
  enabled: boolean;
  port: number;
  password: string;
}

export interface NginxConfig {
  enabled: boolean;
  domain: string;
  https: boolean;
}

export interface NacosConfig {
  enabled: boolean;
  port: number;
  username: string;
  password: string;
  mode: "standalone";
}

export interface GenerateRequest {
  templateType: TemplateType;
  project: ProjectConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  nginx: NginxConfig;
  nacos: NacosConfig;
}

export interface GeneratedFile {
  path: string;
  language: string;
  content: string;
}

export interface PreviewResponse {
  files: GeneratedFile[];
}
