import { ITreeNode } from '../stores';
import { generateRandomString } from '../utils';

export const DEFAULT_FOLDER_TREE: ITreeNode[] = [
  {
    name: 'activities_diagrams',
    type: 'folder',
    hash: generateRandomString(),
    children: [
      {
        name: 'user_login_activity.md',
        type: 'file',
        hash: generateRandomString(),
      },
    ],
  },
  {
    name: 'ui_mockups',
    type: 'folder',
    hash: generateRandomString(),
    children: [],
  },
  {
    name: 'client_requirements.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'clarified_requirements.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'features.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'entities.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'entity_relation_diagram.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'roles.md',
    type: 'file',
    hash: generateRandomString(),
  },
  {
    name: 'role_matrix.md',
    type: 'file',
    hash: generateRandomString(),
  },
];
