import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Button from '@mui/material/Button';
import React from 'react';

export function usePopover(
  folderId: string,
  setOpenModal: any,
  setFolderId: any,
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
  setOpenModal,
  setFolderId,
}: any) {
  const { anchorEl, handleClick, handleClose, open, id, onOpenPopupModal } =
    usePopover(folderId, setOpenModal, setFolderId);

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
