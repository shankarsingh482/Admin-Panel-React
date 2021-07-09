import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Divider, Paper, Grid } from '@material-ui/core';
import { Animated } from 'react-animated-css';


const useStyles = makeStyles((theme) => ({
    paper:
    {
        borderRadius: '4px',
        margin: 'auto',
        padding: theme.spacing(2),
        height: 150,
        maxWidth: 300,

    },
    image:
    {
        transform: " translateY(-40%)",
        width: 80,
        [theme.breakpoints.down('xs')]: {
            width: 50,
            transform: " translateY(-15%)",
          },
    },
    sidebarPaper:
    {
        borderRadius: '4px',
        margin: 'auto',
        padding: theme.spacing(2),
        maxWidth: 300,
        height: 500,
        overflow: 'auto',
    },
    link:
    {
        textDecoration: 'none',
        color: 'inherit'
    },

}));


const MyCard = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container spacing={3} direction="row" alignItems="stretch">

                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/user_management' className={classes.link}>
                        <Paper className={classes.paper}
                            style={{
                                transition: "transform .2s",
                                "&:hover": {
                                    transform: "scale(1.5)"
                                }
                            }}
                            elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='user' src='\user.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Users
                                </Typography>
                                </Grid>
                            </Grid>



                            <Divider />
                        </Paper>
                    </Link>
                </Grid>


                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/package_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Packages
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>





                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/coach_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='partner' src='\coach.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Coach
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/ingredients_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='partner' src='\coach.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Ingredients
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>


                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/testimonials_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Testimonials
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>



                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/support_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Support
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>


                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/workout_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Workout
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/coupon_management' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Coupons
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/additional_functionalities' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Others
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>
                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/additional_functionalities' className={classes.link}>
                        <Paper className={classes.paper} elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                        <img className={classes.image} alt='group' src='\notification.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Notification
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Paper>
                    </Link>
                </Grid>

                <Grid item lg={3} xs={12} md={4} sm={6}>
                    <Link to='/payments' className={classes.link}>
                        <Paper className={classes.paper}
                            style={{
                                transition: "transform .2s",
                                "&:hover": {
                                    transform: "scale(1.5)"
                                }
                            }}
                            elevation={5}>
                            <Grid container>
                                <Grid item xs={12} sm={5} align='center'>
                                    <Animated animationIn="zoomIn" animationOut="pulse" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                    <img className={classes.image} alt='group' src='\packages.svg' />
                                    </Animated>
                                </Grid>
                                <Grid item xs={12} sm={7} align='center'>
                                    <Typography component="h6" variant="h6">
                                        Payment
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


export default MyCard;
