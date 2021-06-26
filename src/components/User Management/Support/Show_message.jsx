
import React, { useState, useEffect } from 'react'
import { show_message_api, send_message_api, close_support_api } from './Support_api';
import { makeStyles } from '@material-ui/core/styles';
import Delete from "@material-ui/icons/Delete"
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton"
import { Grid, Paper } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import { Helmet } from 'react-helmet'
import { Send } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';






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
        borderTopRightRadius: "20px",
        marginLeft: "-20px",
        marginRight: "-20px",
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
        minHeight: "80px",
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
    delete: {
        float: "right",
        paddingRight: "20px",
        color: "white",
    },

    comment:
    {
        backgroundColor: "#353B5B",
        color: "white",
        padding: theme.spacing(3),
        width: "100%",
        borderStyle: "none",
        borderColor: "Transparent"

    },
    send_button:
    {
        paddingTop: "23px",
        backgroundColor: "#353B5B",
        height: "88px",
        color: "white",
    },
}));



export default function ShowMessage(props) {
    var supportId = JSON.stringify(props.history.location.state.supportId)
    var User_name = props.history.location.state.User_name
    var Subject = props.history.location.state.subject;
    const classes = useStyles();
    const [ShowMessage, setShowMessage] = useState([]);
    const [Message, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);



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


    const handleSendMessage = () => {

        const data = {
            support_id: supportId,
            message: Message
        }

        send_message_api(data).then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {
                //alert(res.message)
                window.location.reload();
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }


    // Close Support


    const handleCloseSupport = () => {
        close_support_api(supportId).then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {

                window.location.href = "/open_supports";

            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
                        <IconButton aria-label="delete" className={classes.delete} onClick={handleClickOpen}><Delete /></IconButton>

                        <Dialog
                            fullScreen={false}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">{"Are you sure you want to close this support ?"}</DialogTitle>

                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    NO
                                </Button>
                                <Button onClick={handleCloseSupport} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog><br />
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
                <Grid container>
                    <Grid item xs={10} sm={11} align='left'>
                        <textarea type="textare" className={classes.comment} onChange={handleChangeOfMessage} placeholder="Type your message..." />
                    </Grid>
                    <Grid item xs={2} sm={1} align='right' className={classes.send_button}>
                        <IconButton onClick={handleSendMessage}><Send style={{ color: "white" }} /></IconButton>
                    </Grid>
                </Grid>
            </Container>

        </React.Fragment>

    )
}

