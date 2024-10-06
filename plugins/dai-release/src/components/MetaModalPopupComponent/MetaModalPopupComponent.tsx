import React from 'react';
import {
  Dialog,
  DialogActions,
  styled,
  Button,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { useGetTemplateMetaInfo } from '../../hooks/useTemplatesMetaInfo';

type modalPopupProps = {
  openModal: boolean;
  onClose: () => void;
  instance: string;
  modalPopupInputId: string;
  modalTitle: string;
  modalPopupData: any;
  setModalPopupData: (data: any) => void;
};

export function MetaModalPopupComponent({
  onClose,
  instance,
  modalPopupInputId,
  modalTitle,
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
      maxWidth: '805px',
      borderRadius: '7px',
    },
    '&.loading .MuiDialog-container .MuiPaper-root': {
      overflow: 'hidden',
      background: 'transparent',
      boxShadow: 'none',
      height: 'auto',
      width: 'auto',
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

      a: {
        color: '#3d6c9e',
      },
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
    '& .coc-label-button': {
      background: '#3d6c9e',
      borderRadius: '.25rem',
      color: '#ffffff',
      fontSize: '11px',
      fontWeight: '400',
      height: '16px',
      marginRight: '5px',
      paddingLeft: '5px',
      paddingRight: '5px',
      textAlign: 'center',
      display: 'inline-block',
    },
  }));

  useGetTemplateMetaInfo(instance, modalPopupInputId, setModalPopupData);

  const formatDate = (date: number) =>
    new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        className={!modalPopupData ? 'loading' : ''}
      >
        {!modalPopupData && <CircularProgress />}

        {modalPopupData && (
          <>
            <div className="modal-header">
              <h4 className="modal-title" id="modal-title">
                Meta information - {modalTitle}
              </h4>
              <button type="button" className="cross" onClick={onClose}>
                <CloseIcon fontSize={'small'} />
              </button>
              <div className="clearfix"></div>
            </div>
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
                        href={
                          modalPopupData?.url +
                          '/commit/' +
                          modalPopupData?.commitHash
                        }
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

            <DialogActions>
              <Button className="close" autoFocus onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
}
