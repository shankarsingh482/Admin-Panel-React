import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MyCard from '../cards/MyCard';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar:
  {
    backgroundColor: 'inherit',
    color: '#111',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();




  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          {/* {greeting()} */}
        </Typography>
      </Toolbar>
      <MyCard />
    </React.Fragment>
  );
}
