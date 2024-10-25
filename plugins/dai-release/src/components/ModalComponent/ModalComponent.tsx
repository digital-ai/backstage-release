import {
  getActiveReleaseMetaContent,
  getTemplateMetaContent,
} from '../TemplateHomePageComponent/TemplateMetaContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';
import { styled } from '@mui/material/zero-styled';
import { useGetReleaseMetaInfo } from '../../hooks/useReleaseMetaInfo';
import { useGetTemplateMetaInfo } from '../../hooks/useTemplatesMetaInfo';

type modalPopupProps = {
  openModal: boolean;
  onClose: () => void;
  instance: string;
  modalPopupInputId: string;
  modalTitle: string;
  modalPopupData: any;
  sourcePage: string;
  setModalPopupData: (data: any) => void;
};

export function ModalComponent({
  onClose,
  instance,
  modalPopupInputId,
  modalTitle,
  openModal,
  modalPopupData,
  sourcePage,
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
      marginLeft: '15%',
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

  useGetTemplateMetaInfo(
    instance,
    modalPopupInputId,
    setModalPopupData,
    sourcePage,
  );
  useGetReleaseMetaInfo(setModalPopupData, sourcePage);

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
                {modalTitle}
              </h4>
              <button type="button" className="cross" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </button>
              <div className="clearfix" />
            </div>
            {sourcePage === 'template' &&
              getTemplateMetaContent(modalPopupData, formatDate)}
            {sourcePage === 'release' &&
              getActiveReleaseMetaContent(modalPopupData)}
            <DialogActions>
              <Button className="close" onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </BootstrapDialog>
    </div>
  );
}
