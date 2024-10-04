import React, { useEffect, useRef } from 'react';
import { Dialog, DialogActions, styled } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@mui/material/Button';
import { useGetTemplateMetaInfo } from '../../hooks/useTemplatesMetaInfo';

type modalPopupProps = {
  openModal: boolean;
  onClose: () => void;
  instance: string;
  modalPopupInputId: string;
  modalPopupData: any;
  setModalPopupData: (data: any) => void;
};

export function MetaModalPopupComponent({
  onClose,
  instance,
  modalPopupInputId,
  openModal,
  modalPopupData,
  setModalPopupData,
}: modalPopupProps) {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      width: '805px',
    },
    '& .col-sm-3': {
      width: '25%',
      float: 'left',
      marginBottom: '10px',
      paddingLeft: 0,
    },
    '& .col-sm-9': {
      width: '75%',
      float: 'right',
      marginBottom: '10px',
      paddingLeft: 0,
    },
    '& h4': {
      marginBottom: '10px',
      marginTop: '10px',
    },
    '& .modal-header': {
      backgroundColor: '#3d6c9e',
      borderBottom: 0,
      borderRadius: '6px 6px 0 0',
      color: 'white',
      padding: '1px 10px',
    },
    '& .modal-body': {
      overflowX: 'hidden',
      padding: '15px 15px 0',
      position: 'static',
      wordBreak: 'break-word',
    },
    '& .modal-title': {
      display: 'inline-block',
      lineHeight: 1.1,
      margin: '10px 0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'bottom',
      whiteSpace: 'nowrap',
      width: '80%',
      float: 'left',
    },
    '& .cross': {
      color: 'white',
      fontWeight: 400,
      opacity: 1,
      textShadow: 'none',
      fontSize: '14px',
      marginTop: '8px',
      appearance: 'none',
      background: 'transparent 0 0',
      border: 0,
      cursor: 'pointer',
      padding: 0,
      float: 'right',
    },
    '& .close': {
      textTransform: 'none',
    },
  }));
  const previousModalPopupDataRef = useRef(modalPopupData);

  useEffect(() => {
    previousModalPopupDataRef.current = modalPopupData;
  }, [modalPopupData]);

  useGetTemplateMetaInfo(instance, modalPopupInputId, newData => {
    if (
      JSON.stringify(newData) !==
      JSON.stringify(previousModalPopupDataRef.current)
    ) {
      setModalPopupData(newData);
    }
  });

  return (
    <div>
      {modalPopupData != undefined && (
        <BootstrapDialog
          onClose={onClose}
          aria-labelledby="customized-dialog-title"
          open={openModal}
        >
          <div className="modal-header">
            <h4 className="modal-title pull-left ng-binding" id="modal-title">
              Meta information - {modalPopupData?.name}
            </h4>
            <button type="button" className="cross">
              <CloseIcon fontSize={'small'} />
            </button>
            <div className="clearfix"></div>
          </div>

          <div>
            <div className="modal-body version-control">
              <h4> Source Control Management </h4>
              {!modalPopupData?.name && (
                <p className="ng-hide">No data available.</p>
              )}

              {modalPopupData?.name && (
                <div className="">
                  <div className="col-sm-3">Commit</div>
                  <div className="col-sm-9">
                    <span className="coc-label-button ng-binding"> GIT </span>{' '}
                    <a
                      target="_blank"
                      rel="noopener"
                      className="coc-link ng-binding"
                      href="https://github.com/digital-ai/release-content/commit/2ac34ce51d49e86189a7c41f4eabc0947c4b7fc6"
                    >
                      {' '}
                      2ac34ce51d49e86189a7c41f4eabc0947c4b7fc6{' '}
                    </a>
                  </div>
                  <div className="col-sm-3">Timestamp</div>
                  <div className="col-sm-9 ng-binding">
                    Sep 26, 2024 08:50:13 PM
                  </div>
                  <div className="col-sm-3">Committed by</div>
                  <div className="col-sm-9 ng-binding">gpugar</div>
                  <div className="col-sm-3">Summary</div>
                  <div className="col-sm-9 coc-message ng-binding">ss</div>

                  <div className="col-sm-3">Source</div>
                  <div className="col-sm-9">
                    <a
                      target="_blank"
                      rel="noopener"
                      className="coc-link ng-binding"
                      href="https://github.com/digital-ai/release-content/"
                    >
                      {' '}
                      https://github.com/digital-ai/release-content/{' '}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogActions>
            <Button className="close" autoFocus onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </div>
  );
}
