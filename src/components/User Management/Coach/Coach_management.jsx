import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    Paper,
    Typography,
    Grid,
    Divider
} from '@material-ui/core'

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
    }

}));



export default function CoachManagement(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <h2>Coach Management</h2>
            <br />
            <Grid container spacing={3} direction="row" alignItems="stretch">
                <Grid item lg={4} xs={12} md={6} sm={6} >
                    <Link to='/add_coach_details' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='user' src='\user.png' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Add Coach Details
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={4} xs={12} md={6} sm={6} >
                    <Link to='/coach_certificates' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='user' src='\user.png' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Coach Certificate
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={4} xs={12} md={6} sm={6} >
                    <Link to='/coach_clients' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='user' src='\user.png' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Coach's Clients
                                    </Typography>
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