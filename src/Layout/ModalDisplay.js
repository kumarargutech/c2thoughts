import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ModalDisplay = (props) => {

    const {modalOpen, Transition, handleClose, handleModalClose} = props;

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
          <Button onClick={handleModalClose} color="primary">
            {"No"}
          </Button>
          <Button onClick={handleModalClose} color="primary">
            {"Yes"}
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }

  export default ModalDisplay;