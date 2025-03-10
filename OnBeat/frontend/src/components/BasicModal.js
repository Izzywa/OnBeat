import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  function handleClose() {
    props.setOpenModal(false)
  }

  function ModalButtons() {
    const RenderButton = useCallback(() => {
      switch (true) {
        case props.buttons === "removeTimestamps":
          return(
            <div>
            <div className='d-inline'>
            <button className='btn submit-btn-secondary my-1' onClick={props.handleKeepTimestampsNotes}>Convert timestamps into notes</button>
            </div>
            <div className='d-inline'>
              <button className='btn submit-btn-secondary m-1' onClick={props.handleDeleteAllTimestamps}>Delete timetamps</button>
            </div>
            </div>
          )

        case props.buttons === "deleteNote":
          return(
            <div className='d-inline'>
            <button className='btn submit-btn-secondary m-1' onClick={props.handleDeleteNote}>Yes</button>
            </div>
          )
        default:
            return(
              <></>
            )
      }
    }, [props.openModal]);
    return(
      <div className='modal-buttons'>
        {RenderButton()}
        <div className='d-inline'>
        <button className='btn submit-btn' onClick={handleClose}>Close</button>
        </div>
      </div>
    )
  }

  return (
    <div>

      <Modal
        open={props.openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.messageHeading}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.messageText}
          </Typography>
          <ModalButtons />
        </Box>
      </Modal>
    </div>
  );
}
