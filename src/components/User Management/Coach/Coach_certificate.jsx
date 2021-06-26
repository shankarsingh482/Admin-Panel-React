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
import TextareaAutosize from 'react-autosize-textarea';
import FileBase64 from 'react-file-base64';
import MaterialTable from 'material-table'
  

import { show_coach, show_coach_certificates, add_coach_certificates, delete_coach_certificate } from './Coach_management_api'



const useStyles = makeStyles((theme) => ({
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
    submit: {
        margin: theme.spacing(3, 0, 2),
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
    const [certificateData, setCertificateData] = useState([]);
    const [SelectedCoach, setSelectedCoach] = useState()
    const [Coach, setCoach] = useState([])
    const [CertificateName, setCertificateName] = useState('')
    const [correctCertificateName, setCorrectCertificateName] = useState(true)
    const [CERTIFICATE_IMAGE, setCERTIFICATE_IMAGE] = useState('');
    const [correctCertificateImage, setCorrectCertificateImage] = useState(true)
    const imggSrc= "https://happylifter.s3.ap-south-1.amazonaws.com/happy_lifter/certificate_image/HarpinderSinghPanesarCertificateISSASportsNutritionSpecialist-1.jpg";
    function handleChangeForSelectCoach(e) {
        setSelectedCoach(e.target.value);
        //console.log(e.target.value)
        show_coach_certificates(e.target.value).then((res)=>{
            console.log(res)
            if(res !== undefined && res.RET_CODE === 200){
                setCertificateData(res.data);
            }
            if(res.RET_CODE === 202){
                const data1={
                    "certi_name": "No certificate uploaded yet",
                    "certi_image": "https://happylifter.s3.ap-south-1.amazonaws.com/happy_lifter/ingredients/na.png"
                }
                setCertificateData(data1);
            }
            if(res.RET_CODE ===201){
                setCertificateData([])
            }
        })
        
    }

    const handleRowDelete = (oldData, resolve) => {
        delete_coach_certificate(oldData.certi_image, SelectedCoach)
        .then(res => {
            if (res !== undefined && res.RET_CODE === 200) {
              setTimeout(() => {
                alert(res.message)
                window.location.reload();
                resolve()
              }, 1000);
    
            }
            if (res.RET_CODE === 201) {
              alert(res.message)
              resolve()
            }
          })
          .catch(error => {
            throw error;
          })
    }
    // useEffect(() => {
    //     handleChangeForSelectCoach();
    //   }, [setCertificateData]);

    function handleChangeOfCertificateName(e) {
        setCertificateName(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectCertificateName(true)
        }
        else{
            setCorrectCertificateName(false)
        }
    }

    function getCertificateImage(files) {
        var okay= true
        if (!files.name.match(/\.(jpg|jpeg|png)$/)){
            okay=false
            setCorrectCertificateImage(false)
            alert("Please select an image file")
        }
        if(okay){
            setCERTIFICATE_IMAGE(files.base64.split(',')[1]);
            if(CERTIFICATE_IMAGE!== null){
                setCorrectCertificateImage(true)
            }
            else{
                setCorrectCertificateImage(false)
            }
        }
        
    }

    function submit(e) {
        e.preventDefault();
        var allGood= true;
        // console.log(correctCertificateImage)
        // console.log(correctCertificateName)
        if(correctCertificateName && correctCertificateImage){
            allGood=true
        }
        else{
            allGood=false
        }
        if(!correctCertificateImage){
            alert("Check your inputs")
        }
        const certificate_details_input={
            coach_id: SelectedCoach,
            certificate_name: CertificateName,
            certificate_image: CERTIFICATE_IMAGE,
        }
        if(allGood){
            console.log("good good");
            add_coach_certificates(certificate_details_input).then((res) => {
                console.log(res);
                if (res.RET_CODE == 200) {
                    alert(res.message);
                    window.location.reload();
                } else {
                    //alert(res.data.message);
                    
                    alert("There was some problem");
                }
            });
        }
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

                <Grid item md={9} sm={11} align="center" className={classes.center}>
                    <MaterialTable
                        title="Certificates"
                        align="right"
                        columns={[
                            { title: 'Certificate Name', field: 'certi_name' },
                            
                        ]}
                        data={certificateData}
                        editable={{
                            onRowDelete: (oldData) =>
                              new Promise((resolve) => {
                                handleRowDelete(oldData, resolve)
                              }),
                          }}
                        detailPanel={[
                            {
                            tooltip: 'Show Certificate',
                            render: rowData => {
                                return (
                                <img src={rowData.certi_image}
                                 alt="Certificate Image" width="100%"></img>
                                )
                            },
                            },
                            
                        ]}
                        />
                </Grid>
                <Grid item xs={12} align="center">
                    <h3>Add Certificate</h3>
                </Grid>
                <Container component="main" maxWidth="sm" className={classes.container}>
                <Grid item xs={12} sm={8} className={classes.center}>
                    <TextValidator
                        variant="outlined"
                        required
                        fullWidth
                        id="certificate_name_id"
                        label="Cerificate Name"
                        style={(!correctCertificateName) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={CertificateName}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfCertificateName}
                        InputLabelProps={{ shrink: true }} 
                    />
                </Grid>
                <Grid item xs={12} align="center" className={classes.container}>
                    <FileBase64
                        multiple={false}
                        onDone={getCertificateImage} />
                        <Typography style={{fontSize:'11px', color: '#757575', marginLeft: '8px'}}>**Upload image files (jpg/jpeg/png) only</Typography>

                </Grid>

                </Container>
            </>
            )
        }
    }






    useEffect(() => {
        getData();
    }, [setCoach]);




    return (
        <React.Fragment>
            <Container component="main" maxWidth="md" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Coach Certificates
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
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



                        {/* Submit */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onSubmit={submit}
                            className={classes.submit}
                        >
                            Add Certificate
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}