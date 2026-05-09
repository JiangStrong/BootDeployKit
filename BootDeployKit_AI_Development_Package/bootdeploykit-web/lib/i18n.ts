export type Locale = "en" | "zh" | "ja" | "ko";

export const locales: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" }
];

export const messages = {
  en: {
    navDockerfile: "Dockerfile",
    navCompose: "Compose",
    navNginx: "Nginx",
    navNacos: "Nacos",
    navGuide: "Guide",
    footer: "Generate Spring Boot deployment files in minutes.",
    language: "Language",
    generatorTitle: "Deployment Generator",
    template: "Template",
    previewFiles: "Preview Files",
    previewing: "Previewing",
    downloadZip: "Download ZIP",
    preparingZip: "Preparing ZIP",
    emptyPreview: "Generated files will appear here after preview.",
    previewFailed: "Preview failed",
    projectName: "Project name",
    jarFileName: "JAR file name",
    javaVersion: "Java version",
    serverPort: "Server port",
    springProfile: "Spring profile",
    logPath: "Log path",
    dockerNetwork: "Docker network",
    mysql: "MySQL",
    redis: "Redis",
    databaseName: "Database name",
    dbUser: "DB user",
    dbPassword: "DB password",
    rootPassword: "Root password",
    mysqlPort: "MySQL host port",
    redisPort: "Redis host port",
    redisPassword: "Redis password",
    includeNginx: "Include Nginx reverse proxy",
    domain: "Domain",
    includeNacos: "Include Nacos",
    nacosPort: "Nacos port",
    nacosUsername: "Nacos username",
    nacosPassword: "Nacos password"
  },
  zh: {
    navDockerfile: "Dockerfile",
    navCompose: "编排",
    navNginx: "Nginx",
    navNacos: "Nacos",
    navGuide: "教程",
    footer: "几分钟生成 Spring Boot 上线部署文件。",
    language: "语言",
    generatorTitle: "部署文件生成器",
    template: "模板",
    previewFiles: "预览文件",
    previewing: "正在预览",
    downloadZip: "下载 ZIP",
    preparingZip: "正在打包",
    emptyPreview: "点击预览后，生成的文件会显示在这里。",
    previewFailed: "预览失败",
    projectName: "项目名称",
    jarFileName: "JAR 文件名",
    javaVersion: "Java 版本",
    serverPort: "服务端口",
    springProfile: "Spring Profile",
    logPath: "日志目录",
    dockerNetwork: "Docker 网络",
    mysql: "MySQL",
    redis: "Redis",
    databaseName: "数据库名",
    dbUser: "数据库用户",
    dbPassword: "数据库密码",
    rootPassword: "Root 密码",
    mysqlPort: "MySQL 宿主机端口",
    redisPort: "Redis 宿主机端口",
    redisPassword: "Redis 密码",
    includeNginx: "包含 Nginx 反向代理",
    domain: "域名",
    includeNacos: "包含 Nacos",
    nacosPort: "Nacos 端口",
    nacosUsername: "Nacos 用户名",
    nacosPassword: "Nacos 密码"
  },
  ja: {
    navDockerfile: "Dockerfile",
    navCompose: "Compose",
    navNginx: "Nginx",
    navNacos: "Nacos",
    navGuide: "ガイド",
    footer: "Spring Boot のデプロイファイルを数分で生成します。",
    language: "言語",
    generatorTitle: "デプロイ生成ツール",
    template: "テンプレート",
    previewFiles: "ファイルをプレビュー",
    previewing: "プレビュー中",
    downloadZip: "ZIP をダウンロード",
    preparingZip: "ZIP 作成中",
    emptyPreview: "プレビュー後、生成されたファイルがここに表示されます。",
    previewFailed: "プレビューに失敗しました",
    projectName: "プロジェクト名",
    jarFileName: "JAR ファイル名",
    javaVersion: "Java バージョン",
    serverPort: "サーバーポート",
    springProfile: "Spring Profile",
    logPath: "ログパス",
    dockerNetwork: "Docker ネットワーク",
    mysql: "MySQL",
    redis: "Redis",
    databaseName: "データベース名",
    dbUser: "DB ユーザー",
    dbPassword: "DB パスワード",
    rootPassword: "Root パスワード",
    mysqlPort: "MySQL ホストポート",
    redisPort: "Redis ホストポート",
    redisPassword: "Redis パスワード",
    includeNginx: "Nginx リバースプロキシを含める",
    domain: "ドメイン",
    includeNacos: "Nacos を含める",
    nacosPort: "Nacos ポート",
    nacosUsername: "Nacos ユーザー名",
    nacosPassword: "Nacos パスワード"
  },
  ko: {
    navDockerfile: "Dockerfile",
    navCompose: "Compose",
    navNginx: "Nginx",
    navNacos: "Nacos",
    navGuide: "가이드",
    footer: "Spring Boot 배포 파일을 몇 분 안에 생성합니다.",
    language: "언어",
    generatorTitle: "배포 생성기",
    template: "템플릿",
    previewFiles: "파일 미리보기",
    previewing: "미리보기 중",
    downloadZip: "ZIP 다운로드",
    preparingZip: "ZIP 준비 중",
    emptyPreview: "미리보기 후 생성된 파일이 여기에 표시됩니다.",
    previewFailed: "미리보기에 실패했습니다",
    projectName: "프로젝트 이름",
    jarFileName: "JAR 파일명",
    javaVersion: "Java 버전",
    serverPort: "서버 포트",
    springProfile: "Spring Profile",
    logPath: "로그 경로",
    dockerNetwork: "Docker 네트워크",
    mysql: "MySQL",
    redis: "Redis",
    databaseName: "데이터베이스 이름",
    dbUser: "DB 사용자",
    dbPassword: "DB 비밀번호",
    rootPassword: "Root 비밀번호",
    mysqlPort: "MySQL 호스트 포트",
    redisPort: "Redis 호스트 포트",
    redisPassword: "Redis 비밀번호",
    includeNginx: "Nginx 리버스 프록시 포함",
    domain: "도메인",
    includeNacos: "Nacos 포함",
    nacosPort: "Nacos 포트",
    nacosUsername: "Nacos 사용자명",
    nacosPassword: "Nacos 비밀번호"
  }
} satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof messages.en;

export const templateCopy = {
  en: {
    SPRING_BOOT_BASIC: {
      name: "Spring Boot Basic",
      description: "Single Spring Boot app with Dockerfile, Compose, env and production YAML."
    },
    SPRING_BOOT_MYSQL_REDIS: {
      name: "Spring Boot + MySQL + Redis",
      description: "Application stack with MySQL, Redis, health checks and persistent volumes."
    },
    SPRING_BOOT_NGINX: {
      name: "Spring Boot + Nginx",
      description: "Reverse proxy template for running Spring Boot behind Nginx."
    },
    SPRING_CLOUD_NACOS: {
      name: "Spring Cloud + Nacos",
      description: "Gateway-oriented Spring Cloud deployment with standalone Nacos."
    }
  },
  zh: {
    SPRING_BOOT_BASIC: {
      name: "Spring Boot 基础部署",
      description: "生成单体 Spring Boot 应用所需的 Dockerfile、Compose、env 和生产配置。"
    },
    SPRING_BOOT_MYSQL_REDIS: {
      name: "Spring Boot + MySQL + Redis",
      description: "生成包含应用、MySQL、Redis、健康检查和持久化卷的部署栈。"
    },
    SPRING_BOOT_NGINX: {
      name: "Spring Boot + Nginx",
      description: "生成适合 Spring Boot 后端的 Nginx 反向代理部署模板。"
    },
    SPRING_CLOUD_NACOS: {
      name: "Spring Cloud + Nacos",
      description: "生成面向网关或微服务的 Spring Cloud 与 Nacos 独立部署模板。"
    }
  },
  ja: {
    SPRING_BOOT_BASIC: {
      name: "Spring Boot 基本デプロイ",
      description: "単体 Spring Boot アプリ用の Dockerfile、Compose、env、本番設定を生成します。"
    },
    SPRING_BOOT_MYSQL_REDIS: {
      name: "Spring Boot + MySQL + Redis",
      description: "アプリ、MySQL、Redis、ヘルスチェック、永続ボリュームを含む構成を生成します。"
    },
    SPRING_BOOT_NGINX: {
      name: "Spring Boot + Nginx",
      description: "Spring Boot を Nginx のリバースプロキシ behind で動かすテンプレートです。"
    },
    SPRING_CLOUD_NACOS: {
      name: "Spring Cloud + Nacos",
      description: "Gateway またはマイクロサービス向けの Spring Cloud と Nacos 構成を生成します。"
    }
  },
  ko: {
    SPRING_BOOT_BASIC: {
      name: "Spring Boot 기본 배포",
      description: "단일 Spring Boot 앱용 Dockerfile, Compose, env, 운영 설정을 생성합니다."
    },
    SPRING_BOOT_MYSQL_REDIS: {
      name: "Spring Boot + MySQL + Redis",
      description: "앱, MySQL, Redis, 헬스체크, 영구 볼륨이 포함된 배포 구성을 생성합니다."
    },
    SPRING_BOOT_NGINX: {
      name: "Spring Boot + Nginx",
      description: "Spring Boot 를 Nginx 리버스 프록시 뒤에서 실행하는 배포 템플릿입니다."
    },
    SPRING_CLOUD_NACOS: {
      name: "Spring Cloud + Nacos",
      description: "Gateway 또는 마이크로서비스용 Spring Cloud 와 Nacos 구성을 생성합니다."
    }
  }
} satisfies Record<Locale, Record<string, { name: string; description: string }>>;
