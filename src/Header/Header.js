import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import logoImg from '../assets/images/header/logo.jpg';
import centerImg from '../assets/images/header/center-img.jpg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import ModalDisplay from '../Layout/ModalDisplay';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    bkGroundColor: {
        backgroundColor: 'white'
    },
    title: {
      flexGrow: 1
    },
    userName: {
        color: 'black',
        textAlign: 'center',
        padding: '12px'
    },
    sectionDesktop: {
        display: 'none',
        borderLeft: '1px solid #dcdcdc',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    sectionLogo: {
        borderRight: '1px solid #dcdcdc',
        paddingRight: '12px'
    }
  }));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/octocat`,
      {
        method: "GET"
      }
    ).then(res => res.json())
     .then(response => {
      setUserName(response.name);
     }).catch(error => console.log(error));
  }, [userName]);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setModalOpen(true);
    setOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bkGroundColor}>
        <Toolbar>
            <div className={classes.sectionLogo}>
              <img src={logoImg} alt="logo" />
            </div>
            <div className={classes.title}>
                <img src={centerImg} alt="center-image" />
            </div>
            <div className={classes.sectionDesktop}>
            <IconButton edge="end" aria-label="current user" aria-haspopup="true" color="black">
              <AccountCircle />
            </IconButton>
            <div>
        <Button ref={anchorRef} aria-controls="profile-menu-list" aria-haspopup="true" onClick={handleToggle} className={classes.userName}>
          {userName}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} keepMounted transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper id="profile-menu-list">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem onClick={handleClose}>{"Search"}</MenuItem>
                    <MenuItem onClick={handleClose}>{"Settings"}</MenuItem>
                    <MenuItem onClick={handleClose}>{"What's New"}</MenuItem>
                    <MenuItem onClick={handleClose}>{"My Activity"}</MenuItem>
                    <MenuItem onClick={handleClose}>{"Care Gap Reports"}</MenuItem>
                    <MenuItem onClick={handleClickOpen}>{"Logout"}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {modalOpen ? <ModalDisplay fullScreen={fullScreen}
                      modalOpen={modalOpen}
                      Transition={Transition}
                      handleModalClose={handleModalClose} /> : ''}
      </div>
    </div>
  </Toolbar>
</AppBar>
</div>
);
}
