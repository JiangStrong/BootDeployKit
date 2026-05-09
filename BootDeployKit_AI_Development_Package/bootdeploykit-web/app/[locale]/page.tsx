import { RelatedTools } from "@/components/seo/RelatedTools";
import { locales, templateCopy, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";

const supportedLocales = locales.map((item) => item.code);

const localizedHome = {
  en: {
    title: "Spring Boot Docker Deployment Generator",
    eyebrow: "Spring Boot deployment generator",
    description:
      "Generate Dockerfile, docker-compose.yml, Nginx config, MySQL, Redis, Nacos and production Spring Boot YAML files online.",
    action: "Generate Deployment Files",
    templatesTitle: "Deployment templates",
    templatesDescription: "Choose a production-oriented template and preview every generated file before downloading the ZIP package."
  },
  zh: {
    title: "Spring Boot Docker 部署文件生成器",
    eyebrow: "Spring Boot 部署生成器",
    description:
      "在线生成 Dockerfile、docker-compose.yml、Nginx 配置、MySQL、Redis、Nacos 和 Spring Boot 生产环境 YAML 文件。",
    action: "生成部署文件",
    templatesTitle: "部署模板",
    templatesDescription: "选择面向生产环境的模板，下载 ZIP 前可先预览每一个生成文件。"
  },
  ja: {
    title: "Spring Boot Docker デプロイ生成ツール",
    eyebrow: "Spring Boot デプロイ生成ツール",
    description:
      "Dockerfile、docker-compose.yml、Nginx 設定、MySQL、Redis、Nacos、Spring Boot 本番 YAML をオンラインで生成します。",
    action: "デプロイファイルを生成",
    templatesTitle: "デプロイテンプレート",
    templatesDescription: "本番向けテンプレートを選択し、ZIP をダウンロードする前に生成ファイルを確認できます。"
  },
  ko: {
    title: "Spring Boot Docker 배포 생성기",
    eyebrow: "Spring Boot 배포 생성기",
    description:
      "Dockerfile, docker-compose.yml, Nginx 설정, MySQL, Redis, Nacos, Spring Boot 운영 YAML 파일을 온라인으로 생성합니다.",
    action: "배포 파일 생성",
    templatesTitle: "배포 템플릿",
    templatesDescription: "운영 환경에 맞춘 템플릿을 선택하고 ZIP 다운로드 전에 생성 파일을 미리 확인할 수 있습니다."
  }
} satisfies Record<Locale, Record<string, string>>;

type PageProps = {
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return supportedLocales.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export function generateMetadata({ params }: PageProps) {
  const locale = toLocale(params.locale);
  if (!locale) {
    return {};
  }

  const copy = localizedHome[locale];
  return pageMetadata(copy.title, copy.description);
}

export default function LocalizedHomePage({ params }: PageProps) {
  const locale = toLocale(params.locale);
  if (!locale) {
    notFound();
  }

  const copy = localizedHome[locale];
  const templates = templateCopy[locale];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8">
      <section className="grid gap-5 py-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-accent">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal md:text-5xl">{copy.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-700">{copy.description}</p>
        </div>
        <Link className="inline-flex h-11 w-fit items-center rounded-md bg-accent px-5 text-sm font-semibold text-white hover:bg-teal-800" href="/#generator">
          {copy.action}
        </Link>
      </section>

      <section className="grid gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{copy.templatesTitle}</h2>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">{copy.templatesDescription}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(templates).map(([code, template]) => (
            <Link
              className="rounded-md border border-line bg-white p-4 shadow-panel hover:border-accent"
              href="/#generator"
              key={code}
            >
              <h3 className="font-semibold">{template.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{template.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <RelatedTools />
    </div>
  );
}

function toLocale(value: string): Locale | null {
  return supportedLocales.includes(value as Locale) ? (value as Locale) : null;
}
