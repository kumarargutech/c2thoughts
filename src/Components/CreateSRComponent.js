import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: 300,
    boxShadow: '1px 1px 1px 1px #dcdcdc'
  },
  logoutMsg: {
      marginTop:10
  }
}));

export default function CreateSRComponent() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {"Service Connect"}.
        </Typography>
        <div className={classes.logoutMsg}>
        <Typography component="p">
          {"Create SR Component!"}
        </Typography>
        </div>
      </Paper>
    </div>
  );
}