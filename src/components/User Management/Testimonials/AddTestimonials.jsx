import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PersonAddOutlined from "@material-ui/icons/PersonAddOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Helmet } from 'react-helmet'
import { show_coach ,show_user,sendTestimonials} from './Testimonials_management_api'
import { Rating } from '@material-ui/lab';
import { TextareaAutosize } from '@material-ui/core';
import Button from "@material-ui/core/Button";





const useStyles = makeStyles((theme) => ({

    root1:{
        flexGrow: 1,
        margin: theme.spacing(1),
        marginBottom: theme.spacing(6),
    },
    marginTop1:{
        marginTop: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container:
    {
        marginTop: theme.spacing(2),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    card: {
        borderRadius: "8px",
        borderBottom: "3px",
        borderBottomStyle: "solid",
        borderBottomColor: 'blue',
        padding: theme.spacing(2),
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
    center:{
        marginLeft: "auto",
        marginRight: "auto",
    },
    designTextArea:{
        marginLeft: "130px",
        width: "79%",
        borderRadius: "8px",
        borderBottom: "3px",
        borderBottomStyle: "solid",
        borderBottomColor: 'blue',
        padding: theme.spacing(2),
    },
    ratings: {
        borderRadius: "8px",
        borderBottom: "3px",
        padding: theme.spacing(2),
    },
    submit: {
        marginLeft: "110px",
        marginTop: theme.spacing(3),
    },

}))


export default function Coachpayments(props) {
    const classes = useStyles();
    const [Coach,setCoach] = useState([])
    const [User,setUser] = useState([])
    const [CoachId,setCoachId] = useState('');
    const [UserId,setUserId] = useState('');
    const [StarRating,setStarRating] = useState('');
    const [ReviewMessage,setReviewMessage] = useState('');

    const getCoachData = () => {
        show_coach().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setCoach(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }

    const getUserData = () => {
        show_user().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setUser(res.user_data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }

    useEffect(() => {
        getCoachData();
    }, [setCoach]);

    useEffect(() => {
        getUserData();
    }, [setUser]);

    function getCoachValue(e) {
        setCoachId(e.target.value)
    }
    function getUserValue(e) {
        setUserId(e.target.value)
    }
    function getStarRating(e) {
        setStarRating(e.target.value)
    }
    function getReviewMessage(e) {
        setReviewMessage(e.target.value)
    }


    function submitForm(e){
        const data = {
            coach_id:CoachId,
            user_id  :UserId,
            rating :StarRating,
            testimonials :ReviewMessage
        };
        e.preventDefault();
        if(CoachId && UserId && StarRating && ReviewMessage){
            sendTestimonials(data).then((res) => {
            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert(`Review Submitted Successfully`);
                window.location.reload();
            }
            else {
                // alert(`${res.data.message}`);
                alert("There is some problem");
            }
        });
      }
        else{
          alert("There is some problem");
        }
    }



    return (
        <React.Fragment>
            <Helmet>
                <title>Coach Payments</title>
            </Helmet>
            <Container component="main" maxWidth="md" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Your Reviews
                    </Typography>
                    <ValidatorForm className={classes.form} onSubmit={submitForm}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    id="select_coach_id"
                                    select
                                    label="Select Coach First"
                                    fullWidth
                                    value={Coach.coach_name}
                                    variant="outlined"
                                    onChange={getCoachValue}
                                >
                                    {Coach.map((option) => (
                                        <MenuItem key={option.coach_id} value={option.coach_id}>
                                            {option.coach_name}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    id="select_coach_id"
                                    select
                                    label="Select Client First"
                                    fullWidth
                                    value={User.user_name}
                                    variant="outlined"
                                    onChange={getUserValue}
                                >
                                    {User && User.map((option) => (
                                        <MenuItem key={option.user_type_id} value={option.user_type_id}>
                                            {option.user_name}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>
                        </Grid>
                        <Rating name="size-large" defaultValue={0} onChange={getStarRating} className={classes.ratings} size="large" />
                        <TextareaAutosize
                 rowsMin={4}
                 aria-label="maximum height"
                 placeholder="Write your review"
                 onChange={getReviewMessage}
                 className={classes.designTextArea}
                   />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onSubmit={submitForm}
                        >
                            Submit Review
                        </Button>
                    </ValidatorForm>

                </Paper>

            </Container>

        </React.Fragment>
    )
}
