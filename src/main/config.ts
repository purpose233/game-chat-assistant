import { IAppConfig } from '../interface/config';

const appConfig: IAppConfig = {
  gpt: {
    apiKey: '',
    proxy: 'https://api.openai.com/v1'
  }
};

export function getConfig(): IAppConfig {
  return appConfig;
}

export function updateConfig(config: Partial<IAppConfig>): void {
  Object.assign(appConfig, config);
}
