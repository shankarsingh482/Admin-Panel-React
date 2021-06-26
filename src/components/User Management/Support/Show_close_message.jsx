
import React, { useState, useEffect } from 'react'
import { show_message_api } from './Support_api';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, Paper } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import { Helmet } from 'react-helmet'




const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container:
    {
        marginTop: theme.spacing(1),
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        borderTopLeftRadius: "20px",
        height: "700px",
        overflow: "auto",

    },
    Typography_user:
    {
        margin: "20px",
        backgroundColor: "#D6ECF7",
        borderRadius: "10px",
        padding: theme.spacing(2),
        maxWidth: "450px",
        fontFamily: 'Mulish',
    },
    Typography_admin:
    {
        margin: "20px",
        backgroundColor: "#d3b1ca",
        borderRadius: "10px",
        padding: theme.spacing(2),
        maxWidth: "450px",
        fontFamily: 'Mulish',
    },
    Header:
    {
        backgroundColor: "#349FD9",
        height: "80px",
        paddingTop: "15px",
        paddingBottom: "15px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",

    },
    subHeading: {
        color: "#f2f2f2",
        paddingLeft: "40px",
        fontSize: "13px",
    },
    title:
    {
        color: "white",
        paddingLeft: "40px",
        fontSize: "22px",
        fontStyle: "bold"
    },


}));



export default function ShowMessage(props) {
    var supportId = JSON.stringify(props.history.location.state.supportId)
    var User_name = props.history.location.state.User_name
    var Subject = props.history.location.state.subject;
    const classes = useStyles();
    const [ShowMessage, setShowMessage] = useState([]);
    const [Message, setMessage] = useState('');



    // handle change of state

    function handleChangeOfMessage(e) {
        setMessage(e.target.value);
    }





    const getMessage = () => {


        show_message_api(supportId).then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {
                setShowMessage(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });

    }


    // send message







    useEffect(() => {
        getMessage();
    }, [setShowMessage]);










    return (
        <React.Fragment>
            <Helmet>
                <title>Messages</title>
            </Helmet>
            <Container component="main" maxWidth="md" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <div className={classes.Header}>
                        <span className={classes.title}>{User_name}</span>
                        <br />
                        <span className={classes.subHeading}>{Subject}</span>

                    </div>
                    <Grid container spacing={1}>


                        {ShowMessage.map((message) => (

                            (() => {
                                switch (message.message_by) {
                                    case 0: return (
                                        <Grid item xs={12} align="left">

                                            <Typography className={classes.Typography_user} variant="body1">
                                                {message.message}
                                            </Typography>

                                        </Grid>
                                    )
                                    case 1: return (
                                        <Grid item xs={12} align="right">

                                            <Typography className={classes.Typography_admin} variant="body1" align="left">
                                                {message.message}
                                            </Typography>

                                        </Grid>
                                    )

                                    default: return;
                                }
                            })()

                        ))}

                    </Grid>


                </Paper>

            </Container>

        </React.Fragment>

    )
}

