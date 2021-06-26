
import React, { useState, useEffect } from 'react'

import { show_testimonials_api, approve_testimonials_api, delete_testimonials_api } from './Testimonials_management_api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import DeleteIcon from "@material-ui/icons/Delete"
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Rating from '@material-ui/lab/Rating';
import { Helmet } from 'react-helmet'
import { CardHeader } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        borderRadius: "8px",

    },
    button: {
        margin: theme.spacing(1),
    },
    avatar: {

    },
}));



export default function ShowIngredients(props) {

    const classes = useStyles();
    const [ShowTestimonials, setShowTestimonials] = useState([]);
    const [Shadow, setShadow] = useState({ shadow: 1 });



    const getData = () => {
        show_testimonials_api().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setShowTestimonials(res.data)
                console.log(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }


    // Send Testimonials Id

    function send_testimonial_id(id, approve) {

        const data = {
            testimonial_id: id,
            approve: approve
        }

        approve_testimonials_api(data).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        });

    }



    // Send Testimonials Id For Delete

    function send_testimonial_id_for_delete(id) {
        const data = {
            testimonial_id: id,
        }

        delete_testimonials_api(data).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        });

    }


    useEffect(() => {
        getData();
    }, [setShowTestimonials]);






    return (
        <React.Fragment>
            <Helmet>
                <title>Testimonials</title>
            </Helmet>
            <h2>Testimonials</h2>
            <br />


            <Grid container spacing={3} direction="row" alignItems="stretch">
                {ShowTestimonials.map((testimonials_data) =>
                (
                    <Grid item lg={3} xs={12} md={4} sm={6} >
                        <Card className={classes.card} zdepth={1}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar} src={testimonials_data.user_image}>
                                        {testimonials_data.user_name[0]}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="delete_button" style={{ color: "red" }} onClick={() => { send_testimonial_id_for_delete(testimonials_data.testimonial_id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={testimonials_data.user_name}
                                subheader={testimonials_data.dt_created.split('T', 1)}
                            />
                            <CardActionArea>

                                <CardContent>

                                    <Typography variant="body2" color="textPrimary" component="p">
                                        "{testimonials_data.testimonial}"
                                    </Typography>
                                    <Rating name="read-only" value={testimonials_data.rating} readOnly />
                                    <br />
                                    <br />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        For : {testimonials_data.coach_name}

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Divider />
                            <CardActions>
                                {(() => {
                                    switch (testimonials_data.approve) {
                                        case 0: return <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            onClick={() => { send_testimonial_id(testimonials_data.testimonial_id, !testimonials_data.approve) }}
                                        >
                                            Approve
                                    </Button>

                                        case 1: return <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            className={classes.button}
                                            onClick={() => { send_testimonial_id(testimonials_data.testimonial_id, !testimonials_data.approve) }}
                                        >
                                            Revoke
                                    </Button>

                                        default: return;
                                    }
                                })()}



                            </CardActions>
                        </Card>

                    </Grid>




                ))}
            </Grid>

        </React.Fragment>

    )
}

