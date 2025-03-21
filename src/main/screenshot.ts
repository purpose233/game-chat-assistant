import { globalShortcut } from 'electron';
import Screenshots from '../libs/screenshot';
import { ScreenshotsData } from '../libs/screenshot/interface';

export function registerScreenshot(
  screenshots: Screenshots,
  onOk?: (buffer: Buffer, data: ScreenshotsData) => void
) {
  globalShortcut.register('CommandOrControl+T', () => {
    screenshots.startCapture();
    // screenshots.$view.webContents.openDevTools();
  });
  globalShortcut.register('F1', () => {
    screenshots.$view.webContents.send('SCREENSHOTS:CLOSE');
    if (screenshots.$win?.isFocused()) {
      screenshots.endCapture();
    }
  });
  // 点击确定按钮回调事件
  screenshots.on('ok', (e, buffer, data) => {
    onOk?.(buffer, data);
    e.preventDefault();
  });
  screenshots.on('cancel', (e) => {
    // 执行了preventDefault
    // 点击取消不会关闭截图窗口
    // e.preventDefault();
    // console.log('capture', 'cancel2');
  });
  // 点击保存按钮回调事件
  screenshots.on('save', (e, buffer, bounds) => {
    // console.log('capture', buffer, bounds);
  });
  // 保存后的回调事件
  screenshots.on('afterSave', (e, buffer, bounds, isSaved) => {
    // console.log('capture', buffer, bounds);
    // console.log('isSaved', isSaved); // 是否保存成功
  });
}
