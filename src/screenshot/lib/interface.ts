import { Rectangle } from 'electron';

export interface Display extends Rectangle {
  id: number;
  scaleFactor: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScreenshotsData {
  bounds: Bounds;
  display: Display;
}
