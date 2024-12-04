import React from 'react';
import { TemplateGitMetaInfo } from '@digital-ai/plugin-dai-release-common';

export const getActiveReleaseMetaContent = (
  modalPopupData: TemplateGitMetaInfo,
) => {
  return (
    <div>
      <div className="modal-body version-control">
        {!modalPopupData?.name ? (
          <p>No data available.</p>
        ) : (
          <div className="" />
        )}
      </div>
    </div>
  );
};
