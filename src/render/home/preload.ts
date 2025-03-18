import { contextBridge, ipcRenderer } from 'electron';
import { IAppConfig } from '../../interface/config';

contextBridge.exposeInMainWorld('electronAPI', {
  updateConfig: (config: Partial<IAppConfig>) => ipcRenderer.send('CONFIG:UPDATE', config)
});
