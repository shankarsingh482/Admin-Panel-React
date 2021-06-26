
import React, { useState, useEffect } from 'react'
import { show_support_api } from './Support_api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet'
import { CardHeader } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        borderRadius: "8px",
        borderBottom: "3px",
        borderBottomStyle: "solid",
        borderBottomColor: 'blue'

    },
    button: {
        margin: theme.spacing(1),
    },
    avatar: {

    },
    CardActionArea:
    {
        backgroundColor: "#F9F9F9",
    }
}));



export default function ShowSupport(props) {

    const classes = useStyles();
    const [ShowSupport, setShowSupport] = useState([]);



    const getData = () => {
        show_support_api().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setShowSupport(res.data)

            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }



    function sendSupportId(id, user_name, subject) {
        props.history.push({
            pathname: '/messages',
            state: {
                supportId: id,
                User_name: user_name,
                subject: subject
            }
        })

    }



    useEffect(() => {
        getData();
    }, [setShowSupport]);






    return (
        <React.Fragment>
            <Helmet>
                <title>Open Supports</title>
            </Helmet>
            <h2>Open Supports</h2>
            <br />


            <Grid container spacing={3} direction="row" alignItems="stretch">
                {ShowSupport.map((support_data) =>
                (
                    <Grid item lg={3} xs={12} md={4} sm={6} >
                        <Card className={classes.card} zdepth={1}>
                            <CardHeader
                                title={support_data.name}
                                subheader={support_data.date_created.split('T', 1)}
                            />
                            <CardActionArea className={classes.CardActionArea}>

                                <CardContent onClick={() => sendSupportId(support_data.support_id, support_data.name, support_data.subject)}>

                                    <Typography variant="body2" color="textPrimary" component="p">
                                        Subject : {support_data.subject}
                                    </Typography>
                                    <br />

                                </CardContent>
                            </CardActionArea>
                            <Divider />

                        </Card>

                    </Grid>




                ))}
            </Grid>

        </React.Fragment>

    )
}

