import React from 'react';

import { CLASSNAMES } from '../../../../configs';
import { useFolderTreeAtom } from '../../../../stores';
import { TreeNode } from '../TreeNode';

export function FolderTree() {
  const { folderTree } = useFolderTreeAtom();

  return (
    <div className="w-100 h-100">
      <div className={CLASSNAMES.HEADER_PANEL}>
        <small>Folder Tree</small>
      </div>
      <div className={CLASSNAMES.BODY_PANEL}>
        {folderTree?.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </div>
    </div>
  );
}
