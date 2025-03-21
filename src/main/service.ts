import { BrowserWindow, ipcMain } from 'electron';
import Screenshots from '../libs/screenshot';
import { registerScreenshot } from './screenshot';
import { updateConfig } from './config';
import { translateAndReply } from './gpt';
import { IAppConfig } from '../interface/config';

export class AppService {
  private browserWindow: BrowserWindow;
  private screenshot: Screenshots;

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
    this.screenshot = new Screenshots();
  }

  public init() {
    ipcMain.on('SERVICE:UPDATE_CONFIG', (event, config: Partial<IAppConfig>) => {
      updateConfig(config);
    });
    registerScreenshot(this.screenshot, async (buffer, data) => {
      const result = (await translateAndReply(buffer)) ?? {
        origin: [],
        translate: [],
        replies: []
      };
      this.screenshot.$view.webContents.send('SCREENSHOTS:TRANSLATE_AND_REPLY', result);
      this.browserWindow.webContents.send('MAIN:TRANSLATE_AND_REPLY', result);
    });
  }
}
