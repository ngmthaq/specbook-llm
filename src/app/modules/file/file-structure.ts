import { TreeNode } from '../../../shared/types/folderTree';
import { generateRandomString } from '../../../shared/utils/text';

export const defaultFileStructure: TreeNode[] = [
  {
    name: 'activities_diagrams',
    type: 'folder',
    children: [],
    hash: generateRandomString(),
  },
  {
    name: 'use_case_diagrams',
    type: 'folder',
    children: [],
    hash: generateRandomString(),
  },
  {
    name: 'ui_mockups',
    type: 'folder',
    children: [],
    hash: generateRandomString(),
  },
  {
    name: 'ui_mockup_descriptions',
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
    name: 'features.md',
    type: 'file',
    hash: generateRandomString(),
  },
];
