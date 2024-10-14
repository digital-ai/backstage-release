import React from 'react';
import { TemplateGitMetaInfo } from '@digital-ai/plugin-dai-release-common';

export const getTemplateMetaContent = (
  modalPopupData: TemplateGitMetaInfo,
  formatDate: (date: number) => string,
) => {
  return (
    <div>
      <div className="modal-body version-control">
        <h4> Source Control Management </h4>
        {!modalPopupData?.name ? (
          <p>No data available.</p>
        ) : (
          <div className="">
            <div className="col-sm-3">Commit</div>
            <div className="col-sm-9">
              <span className="coc-label-button"> GIT </span>{' '}
              <a
                target="_blank"
                rel="noopener"
                href={`${modalPopupData?.url}/commit/${modalPopupData?.commitHash}`}
              >
                {modalPopupData?.commitHash}
              </a>
            </div>
            <div className="col-sm-3">Timestamp</div>
            <div className="col-sm-9">
              {formatDate(modalPopupData?.commitTime)}
            </div>
            <div className="col-sm-3">Committed by</div>
            <div className="col-sm-9">{modalPopupData?.committer}</div>
            <div className="col-sm-3">Summary</div>
            <div className="col-sm-9 coc-message">
              [{modalPopupData?.name}] {modalPopupData?.shortMessage}
            </div>

            <div className="col-sm-3">Source</div>
            <div className="col-sm-9">
              <a
                target="_blank"
                rel="noopener"
                className="coc-link"
                href={modalPopupData?.url}
              >
                {modalPopupData?.url}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
