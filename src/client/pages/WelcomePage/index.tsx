import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FULL_ROUTE_PATHS } from '../../configs/routePaths';
import { useFolderTreeAtom } from '../../stores/useFolderTreeAtom';

export function WelcomePage() {
  const navigate = useNavigate();
  const { selectedFolderDir, setFolderTree, setSelectedFolderDir } = useFolderTreeAtom();

  const handleOpenProject = async () => {
    const openProjectResponse = await window.electronAPI.filePublisher.openWorkspace();
    if (openProjectResponse.success) {
      setFolderTree(openProjectResponse.tree || []);
      setSelectedFolderDir(openProjectResponse.workspacePath || '');
      navigate(FULL_ROUTE_PATHS.FOLDER_TREE);
    } else {
      // Handle error (e.g., show a notification)
      console.error('Failed to open project:', openProjectResponse.error);
    }
  };

  const handleCreateNewWorkspace = async () => {
    const openProjectResponse = await window.electronAPI.filePublisher.createWorkspace();
    if (openProjectResponse.success) {
      setFolderTree(openProjectResponse.tree || []);
      setSelectedFolderDir(openProjectResponse.workspacePath || '');
      navigate(FULL_ROUTE_PATHS.FOLDER_TREE);
    } else {
      // Handle error (e.g., show a notification)
      console.error('Failed to open project:', openProjectResponse.error);
    }
  };

  useEffect(() => {
    if (selectedFolderDir) navigate(FULL_ROUTE_PATHS.FOLDER_TREE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderDir]);

  return (
    <div className="container">
      <div className="logo d-flex justify-content-center my-4">
        <i className="bi bi-lightning-charge-fill fs-1 text-secondary" />
      </div>
      <div className="card text-center p-4">
        <h2 className="mb-3">Welcome to Specbook LLM!</h2>
        <p className="mb-4">
          Your AI-powered documentation and code assistant.
          <br />
          Get started by opening a project or creating a new spec.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={() => handleOpenProject()}>
            <i className="bi bi-folder2-open me-2" />
            Open Project
          </button>
          <button className="btn btn-outline-secondary" onClick={handleCreateNewWorkspace}>
            <i className="bi bi-file-earmark-plus me-2" />
            New Spec
          </button>
        </div>
      </div>
      <div className="mt-4 text-secondary text-center small">
        <i className="bi bi-info-circle me-1" />
        Need help? Visit our docs or community.
      </div>
    </div>
  );
}
