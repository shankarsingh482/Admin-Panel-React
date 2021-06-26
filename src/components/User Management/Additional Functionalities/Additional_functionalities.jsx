import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    Paper,
    Typography,
    Grid,
    Divider,
    Button
} from '@material-ui/core';

import { Animated } from "react-animated-css";





const useStyles = makeStyles((theme) => ({

    paper:
    {
        borderRadius: '4px',
        margin: 'auto',
        padding: theme.spacing(2),
        height: 165,
        maxWidth: 300,

    },
    image:
    {
        transform: " translateY(-40%)",
        width: 70,
        [theme.breakpoints.down('xs')]: {
            width: 50,
            transform: " translateY(-15%)",
          },
    },
    link:
    {
        textDecoration: 'none',
        color: 'inherit'
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },

}));



export default function AdditionalFunctionalities(props) {
    const classes = useStyles();

    return (
        <React.Fragment>

            <br />
            <Grid container spacing={3} direction="row" alignItems="stretch">
                <Grid item lg={4} xs={12} md={6} sm={6} >
                    <Link to='/notifications' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='user' src='\user.png' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                    <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className='form_button'
                                                onClick={()=>{console.log("submit")}}
                                            >
                                                Messages
                                    </Button>
                                    </Typography>
                                {/* <div>
                                    <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className='form_button'
                                                onClick={()=>{console.log("submit")}}
                                            >
                                                Messages
                                    </Button>
                                </div> */}
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>


            </Grid>


        </React.Fragment>
    )
}