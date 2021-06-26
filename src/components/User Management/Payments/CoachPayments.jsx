import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PersonAddOutlined from "@material-ui/icons/PersonAddOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {Container, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import MaterialTable from 'material-table'
import { Helmet } from 'react-helmet'
import { show_coach, show_coach_clients } from './Payment_api'



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
    }


}))


export default function Coachpayments(props) {
    const classes = useStyles();
    const [clientActiveData, setClientActiveData] = useState([]);
    const [clientSoonExpData, setClientSoonExpData] = useState([]);
    const [clientExpiredData, setClientExpiredData] = useState([]);
    const [noData, setNoData] = useState(false)
    const [SelectedCoach, setSelectedCoach] = useState()
    const [Coach, setCoach] = useState([])
    function handleChangeForSelectCoach(e) {
        setSelectedCoach(e.target.value);
        show_coach_clients(e.target.value).then((res)=>{
            //console.log(res)
            if(res !== undefined && res.RET_CODE === 200){
                setClientActiveData(res.data);
                setClientSoonExpData(res.data)
                setClientExpiredData(res.data)
                setNoData(false)
                //console.log(res.active_clients.length)
            }
            if(res.RET_CODE === 201){
                setNoData(true)
            }
        })

    }
    function dateFormat(dt){
        var d = (new Date(dt)+'').split(' ');
        var date=  (d[2]+" "+d[1]+", "+ d[3]);
        return date;
    }

    const getData = () => {
        show_coach().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setCoach(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }



    function showDetailsFunction() {
        if (SelectedCoach) {
            return (<>
                {/* Profile Image */}
                {noData ? <div className={classes.root}><br></br><h2>No clients yet !!</h2><br></br></div>
                :

                <div className={classes.root1}>

                {(clientActiveData.length>0) ? (
                <><br></br>
               <MaterialTable
                        title="Active Clients"
                        columns={[
                            { title: 'User Name', field: 'user_name' },
                            { title: 'Coach Name', field: 'coach_name' },
                            { title: 'Package Name', field: 'package_name' },
                            { title: 'Date', field: 'date', render: rowData => dateFormat(rowData.date)},
                            { title: 'Amount', field: 'amount' },
                            { title: 'Payment ID', field: 'razorpay_payment_id' },
                            { title: 'Order ID', field: 'razorpay_order_id' },
                        ]}


                        data={clientActiveData}

                        options={{
                            exportButton: true,
                        }}
                    />
                </>):''
                }
                </div>
            }
            </>
            )

        }
    }






    useEffect(() => {
        getData();
    }, [setCoach]);




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
                        Coach Payments
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            {/* Select Coach */}

                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    id="select_coach_id"
                                    select
                                    label="Select Coach First"
                                    fullWidth
                                    value={Coach.coach_name}
                                    onChange={handleChangeForSelectCoach}
                                    variant="outlined"
                                >
                                    {Coach.map((option) => (
                                        <MenuItem key={option.coach_id} value={option.coach_id}>
                                            {option.coach_name}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>


                            {showDetailsFunction()}


                        </Grid>


                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}
