import Button from '@mui/material/Button';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@mui/material/Popover';
import React from 'react';
import { useState } from 'react';

export function usePopover(
  folderId: string,
  modalTitle: string,
  setOpenModal: any,
  setFolderId: any,
  setModalTitle: any,
) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOpenPopupModal = () => {
    setOpenModal(true);
    setFolderId(folderId);
    setModalTitle(modalTitle);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return {
    anchorEl,
    handleClick,
    handleClose,
    open,
    id,
    onOpenPopupModal,
  };
}

export function ReleasePopOverComponent({
  folderId,
  modalTitle,
  setOpenModal,
  setFolderId,
  setModalTitle,
}: any) {
  const { anchorEl, handleClick, handleClose, open, id, onOpenPopupModal } =
    usePopover(folderId, modalTitle, setOpenModal, setFolderId, setModalTitle);

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          size="small"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button variant="text" onClick={onOpenPopupModal}>
            Meta Information
          </Button>
        </Popover>
      </div>
    </>
  );
}
