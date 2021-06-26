import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ContactMail from "@material-ui/icons/ContactMail";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Helmet } from 'react-helmet'




const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container:
    {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(0),
            padding: theme.spacing(0),
          }
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(1),
          }
    },
    error: {
        color: "red",
        fontSize: "12px",
    },

}))






export default function Notification(props) {
    const classes = useStyles();

    // useState Hooks
    const [receiver, setReceiver] = useState('')




    function handleChangeOfPackageFor(e) {
        setReceiver(e.target.value)
        console.log({receiver});

    }


    // function for handle Submit

    function submit(e) {
        e.preventDefault();
        console.log('inside submit',{receiver});
    }

    const messages_for = [
        {
            value: "for_particular_user",
            label: "FOR PARTICULAR USER",
        },
        {
            value: 'for_coach',
            label: "FOR COACH",
        },
        {
            value: 'for_user',
            label: "FOR USER",
        }
    ];



    return (
        <React.Fragment>
            <Helmet>
                <title>Messages</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ContactMail />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Messages For
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>
                                <TextValidator
                                    id="messages_user"
                                    select
                                    label="messages For"
                                    fullWidth
                                    value={receiver}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfPackageFor}
                                    variant="outlined"
                                >
                                    {messages_for.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onSubmit={submit}
                            submitButtonText="Submit"
                            className={classes.submit}
                        >
                            Send
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment >
    )
}
