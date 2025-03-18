/* eslint-disable no-console */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ScreenshotsData } from '../../libs/screenshot/interface';

type IpcRendererListener = (event: IpcRendererEvent, ...args: unknown[]) => void;
type ScreenshotsListener = (...args: unknown[]) => void;

const map = new Map<ScreenshotsListener, Record<string, IpcRendererListener>>();

contextBridge.exposeInMainWorld('screenshots', {
  ready: () => {
    ipcRenderer.send('SCREENSHOTS:ready');
  },
  reset: () => {
    ipcRenderer.send('SCREENSHOTS:reset');
  },
  save: (arrayBuffer: ArrayBuffer, data: ScreenshotsData) => {
    ipcRenderer.send('SCREENSHOTS:save', Buffer.from(arrayBuffer), data);
  },
  cancel: () => {
    ipcRenderer.send('SCREENSHOTS:cancel');
  },
  ok: (arrayBuffer: ArrayBuffer, data: ScreenshotsData) => {
    ipcRenderer.send('SCREENSHOTS:ok', Buffer.from(arrayBuffer), data);
  },
  on: (channel: string, fn: ScreenshotsListener) => {
    const listener = (event: IpcRendererEvent, ...args: unknown[]) => {
      fn(...args);
    };

    const listeners = map.get(fn) ?? {};
    listeners[channel] = listener;
    map.set(fn, listeners);

    ipcRenderer.on(`SCREENSHOTS:${channel}`, listener);
  },
  off: (channel: string, fn: ScreenshotsListener) => {
    const listeners = map.get(fn) ?? {};
    const listener = listeners[channel];
    delete listeners[channel];

    if (!listener) {
      return;
    }

    ipcRenderer.off(`SCREENSHOTS:${channel}`, listener);
  }
});
