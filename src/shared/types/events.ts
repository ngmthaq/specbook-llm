import { IpcRendererEvent } from 'electron';

export type PreloadEventCallback = (event: IpcRendererEvent, ...args: unknown[]) => void;
