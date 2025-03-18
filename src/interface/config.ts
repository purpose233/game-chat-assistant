export interface IGPTConfig {
  // provider: string;
  // model: string;
  apiKey: string;
  proxy: string;
}

export interface IAppConfig {
  // language: ILanguageConfig;
  // ocr: IOCRConfig;
  gpt: IGPTConfig;
}

export interface ITranslateAndReplyResult {
  translate: {
    speaker: string;
    message: string;
  }[];
  replies: {
    en: string;
    zh: string;
  }[];
}
