import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { CardHeader } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { show_coach, show_coach_clients } from './Coach_management_api'



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


export default function CoachCertificate(props) {
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
                setClientActiveData(res.active_clients);
                setClientSoonExpData(res.expire_soon_clients)
                setClientExpiredData(res.inactive_clients)
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
                            { title: 'Avatar', field: 'user_image', render: rowData => <img src={rowData.user_image} style={{width: 50, borderRadius: '50%'}}/> },
                            { title: 'Client Name', field: 'user_name' },
                            { title: 'Package Name', field: 'package_name' },
                            { title: 'Start Date', field: 'dt_created', render: rowData => dateFormat(rowData.dt_created)},
                            { title: 'Expiry Date', field: 'expiry_date', render: rowData => dateFormat(rowData.expiry_date) },
                        ]}


                        data={clientActiveData}

                        options={{
                            exportButton: true,
                        }}
                    />
                </>):''
                }
                {(clientSoonExpData.length>0) ? (
                <><br></br>
               <MaterialTable
                        className={classes.marginTop1}
                        title="Soon going to be inactived clients"
                        columns={[
                            { title: 'Avatar', field: 'user_image', render: rowData => <img src={rowData.user_image} style={{width: 50, borderRadius: '50%'}}/> },
                            { title: 'Client Name', field: 'user_name' },
                            { title: 'Package Name', field: 'package_name' },
                            { title: 'Start Date', field: 'dt_created', render: rowData => dateFormat(rowData.dt_created)},
                            { title: 'Expiry Date', field: 'expiry_date', render: rowData => dateFormat(rowData.expiry_date) },
                        ]}


                        data={clientSoonExpData}

                        options={{
                            exportButton: true,
                        }}
                    />
                </>):''
                }
                
                {(clientExpiredData.length>0) ? (
                <><br></br>
               <MaterialTable
                        className={classes.marginTop1}
                        title="Inactive clients"
                        columns={[
                            { title: 'Avatar', field: 'user_image', render: rowData => <img src={rowData.user_image} style={{width: 60, borderRadius: '50%'}}/> },
                            { title: 'Client Name', field: 'user_name' },
                            { title: 'Package Name', field: 'package_name' },
                            { title: 'Start Date', field: 'dt_created', render: rowData => dateFormat(rowData.dt_created)},
                            { title: 'Expiry Date', field: 'expiry_date', render: rowData => dateFormat(rowData.expiry_date) },
                        ]}


                        data={clientExpiredData}

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
            // return (<>
            //     {/* Profile Image */}
            //     {noData ? <div className={classes.root}><h2>No clients yet !!</h2><br></br></div>
            //     :

            //     <div className={classes.root}>
                
            //     {(clientActiveData.length>0) ? (<><h2>Active Clients</h2><br></br><br></br></>):''}
            //     <Grid container spacing={3} direction="row" alignItems="stretch">
            //     {clientActiveData.map((active_client) =>
            //     (
            //         <Grid item lg={6} xs={12} >
            //             <Card className={classes.card} zdepth={1}>
            //             <Box display="flex" flexDirection="row" p={1} m={1}>
            //                 <Box><Avatar alt={active_client.user_name} src={active_client.user_image} className={classes.large} /></Box>
            //                 <Box p={4}><h2>{active_client.user_name}</h2></Box>
            //             </Box>
            //                 {/* <CardActionArea className={classes.CardActionArea}>

            //                     <CardContent onClick={() => sendDetails()}>

            //                     </CardContent>
            //                 </CardActionArea> */}
            //                 <Divider />
            //             <Box p={1}>
            //                 <h4><b>Package Name: </b> {active_client.package_name}</h4>
            //                 <h4><b>Starting Date: </b> {dateFormat(active_client.dt_created)}</h4>
            //                 <h4><b>Expiry Date: </b> {dateFormat(active_client.expiry_date)}</h4>
            //             </Box>
            //             </Card>

            //         </Grid>
            //     ))}
            //     </Grid>

            //     {(clientSoonExpData.length>0) ? (<><h2>Soon going to inactive clients</h2><br></br><br></br></>):''}
            //     <Grid container spacing={3} direction="row" alignItems="stretch">
            //     {clientSoonExpData.map((soon_inactive_client) =>
            //     (
            //         <Grid item lg={6} xs={12} >
            //             <Card className={classes.card} zdepth={1}>
            //             <Box display="flex" flexDirection="row" p={1} m={1}>
            //                 <Box><Avatar alt={soon_inactive_client.user_name} src={soon_inactive_client.user_image} className={classes.large} /></Box>
            //                 <Box p={4}><h2>{soon_inactive_client.user_name}</h2></Box>
            //             </Box>
            //                 {/* <CardActionArea className={classes.CardActionArea}>

            //                     <CardContent onClick={() => sendDetails()}>

            //                     </CardContent>
            //                 </CardActionArea> */}
            //                 <Divider />
            //             <Box p={1}>
            //                 <h4><b>Package Name: </b> {soon_inactive_client.package_name}</h4>
            //                 <h4><b>Starting Date: </b> {dateFormat(soon_inactive_client.dt_created)}</h4>
            //                 <h4><b>Expiry Date: </b> {dateFormat(soon_inactive_client.expiry_date)}</h4>
            //             </Box>
            //             </Card>

            //         </Grid>
            //     ))}
            //     </Grid>

            //     {(clientExpiredData.length>0) ? (<><h2>Inactive clients</h2><br></br><br></br></>):''}
            //     <Grid container spacing={3} direction="row" alignItems="stretch">
            //     {clientExpiredData.map((inactive_client) =>
            //     (
            //         <Grid item lg={6} xs={12} >
            //             <Card className={classes.card} zdepth={1}>
            //             <Box display="flex" flexDirection="row" p={1} m={1}>
            //                 <Box><Avatar alt={inactive_client.user_name} src={inactive_client.user_image} className={classes.large} /></Box>
            //                 <Box p={4}><h2>{inactive_client.user_name}</h2></Box>
            //             </Box>
            //                 {/* <CardActionArea className={classes.CardActionArea}>

            //                     <CardContent onClick={() => sendDetails()}>

            //                     </CardContent>
            //                 </CardActionArea> */}
            //                 <Divider />
            //             <Box p={1}>
            //                 <h4><b>Package Name: </b> {inactive_client.package_name}</h4>
            //                 <h4><b>Starting Date: </b> {dateFormat(inactive_client.dt_created)}</h4>
            //                 <h4><b>Expiry Date: </b> {dateFormat(inactive_client.expiry_date)}</h4>
            //             </Box>
            //             </Card>

            //         </Grid>
            //     ))}
            //     </Grid>

            //     </div>
            // }
            // </>
            // )
        }
    }






    useEffect(() => {
        getData();
    }, [setCoach]);




    return (
        <React.Fragment>
            <Helmet>
                <title>Coach's Clients</title>
            </Helmet>
            <Container component="main" maxWidth="md" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Coach's Clients
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