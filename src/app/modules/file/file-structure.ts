import { TreeNode } from '../../../shared/types/folderTree';
import { generateRandomString } from '../../../shared/utils/text';

export const defaultFileStructure: TreeNode[] = [
  {
    name: 'activities_diagrams',
    type: 'folder',
    children: [
      {
        name: 'user_login_activity.md',
        type: 'file',
        hash: generateRandomString(),
      },
    ],
    hash: generateRandomString(),
  },
  {
    name: 'ui_mockups',
    type: 'folder',
    children: [],
    hash: generateRandomString(),
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
