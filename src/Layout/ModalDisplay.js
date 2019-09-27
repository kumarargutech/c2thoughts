import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from "react-router-dom";

export default function ModalDisplay(props) {

const {modalOpen, Transition, handleClose, handleModalClose, textDecoration} = props;
  return (
    <div>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="logout"
      >
        <DialogTitle id="logout-title">{"Are you sure you want to logout?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary"> {"No"} </Button>
            <Link to="/logout" className={textDecoration}><Button color="primary">{"Yes"}</Button></Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
