import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import bkGroundSection from '../assets/images/comingsoon/bkground.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'hidden',
  },
  bkGroundImg: {
    width: '100%',
    height: '900px',
    overflowX: 'hidden'
  },
  content: {
    position: 'absolute',
    top: 300,
    left: 650
  },
  heading: {
      fontSize: 26
  },
  subtitle: {
      color: 'white',
      fontSize: 25
  }
}));

export default function ComingSoonComponent(props) {
  const classes = useStyles();

  return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.heading}><h4>{"WE ARE CURRENTLY WORKING ON AN AWESOME NEW SITE."}</h4></div>
                <div className={classes.subtitle}><h5>{"Coming Soon !!!"}</h5></div>
            </div>
            <img src={bkGroundSection} className={classes.bkGroundImg}/>
        </div>
       );
}
