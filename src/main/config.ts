import { IAppConfig } from '../interface/config';

const config: IAppConfig = {
  gpt: {
    apiKey: '',
    proxy: 'https://api.openai.com/v1'
  }
};

export function getConfig(): IAppConfig {
  return config;
}

export function updateConfig(config: Partial<IAppConfig>): void {
  Object.assign(config, config);
}
