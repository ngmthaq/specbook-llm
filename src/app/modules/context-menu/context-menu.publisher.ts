import { ipcRenderer } from 'electron';
import {
  OpenFileNodeContextMenuPayload,
  OpenFolderNodeContextMenuPayload,
  OpenFolderTreeContextMenuPayload,
} from '../../../shared/types/contextMenu';
import { Publisher } from '../../core/publisher';
import { CONTEXT_MENU_CHANNELS } from './context-menu-channels';

export class ContextMenuPublisher extends Publisher {
  public openFolderTreeContextMenu = (payload: OpenFolderTreeContextMenuPayload) => {
    return ipcRenderer.invoke(CONTEXT_MENU_CHANNELS.OPEN_FOLDER_TREE_CONTEXT_MENU, payload);
  };

  public openFolderNodeContextMenu = (payload: OpenFolderNodeContextMenuPayload) => {
    return ipcRenderer.invoke(CONTEXT_MENU_CHANNELS.OPEN_FOLDER_NODE_CONTEXT_MENU, payload);
  };

  public openFileNodeContextMenu = (payload: OpenFileNodeContextMenuPayload) => {
    return ipcRenderer.invoke(CONTEXT_MENU_CHANNELS.OPEN_FILE_NODE_CONTEXT_MENU, payload);
  };
}
