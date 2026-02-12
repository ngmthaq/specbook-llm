import { TreeNode } from '../../../shared/types/folderTree';
import { generateRandomString } from '../../../shared/utils/text';

export const defaultFileStructure: TreeNode[] = [
  {
    type: 'folder',
    name: '1_requirements',
    hash: generateRandomString(),
    children: [
      {
        type: 'file',
        name: '1_client_requirement.md',
        hash: generateRandomString(),
      },
      {
        type: 'file',
        name: '2_clarification_requirement.md',
        hash: generateRandomString(),
      },
    ],
  },
  {
    type: 'folder',
    name: '2_analysis_documents',
    hash: generateRandomString(),
    children: [
      {
        type: 'file',
        name: '1_actors.md',
        hash: generateRandomString(),
      },
      {
        type: 'file',
        name: '2_features.md',
        hash: generateRandomString(),
      },
      {
        type: 'file',
        name: '3_actor_feature_matrix.md',
        hash: generateRandomString(),
      },
      {
        type: 'file',
        name: '4_entities.md',
        hash: generateRandomString(),
      },
      {
        type: 'file',
        name: '5_entity_relationship_diagram.md',
        hash: generateRandomString(),
      },
    ],
  },
  {
    type: 'folder',
    name: '3_user_stories',
    hash: generateRandomString(),
    children: [],
  },
  {
    type: 'file',
    name: 'README.md',
    hash: generateRandomString(),
  },
];
