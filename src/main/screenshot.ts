import { globalShortcut } from 'electron';
import Screenshots from '../libs/screenshot';

export function registerScreenshot() {
  const screenshots = new Screenshots();
  globalShortcut.register('CommandOrControl+T', () => {
    console.log('开始截屏!!!!');
    screenshots.startCapture();
    screenshots.$view.webContents.openDevTools();
  });
  // globalShortcut.register('esc', () => {
  //   if (screenshots.$win?.isFocused()) {
  //     screenshots.endCapture();
  //   }
  // });
  // 点击确定按钮回调事件
  screenshots.on('ok', (e, buffer, bounds) => {
    console.log('capture', buffer, bounds);
  });
  // 点击取消按钮回调事件
  screenshots.on('cancel', () => {
    console.log('capture', 'cancel1');
  });
  screenshots.on('cancel', (e) => {
    // 执行了preventDefault
    // 点击取消不会关闭截图窗口
    e.preventDefault();
    console.log('capture', 'cancel2');
  });
  // 点击保存按钮回调事件
  screenshots.on('save', (e, buffer, bounds) => {
    console.log('capture', buffer, bounds);
  });
  // 保存后的回调事件
  screenshots.on('afterSave', (e, buffer, bounds, isSaved) => {
    console.log('capture', buffer, bounds);
    console.log('isSaved', isSaved); // 是否保存成功
  });
}
