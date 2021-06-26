import React, { useState, useEffect } from 'react';
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
import { show_coach, show_package, assign_packages } from './Package_management_api';
import { Helmet } from 'react-helmet'




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
    error: {
        color: "red",
        fontSize: "12px",
    },

}))






export default function Packages(props) {
    const classes = useStyles();

    // useState Hooks
    const [Coach, setCoach] = useState([])
    const [SelectedCoach, setSelectedCoach] = useState('')
    const [Packages, setPackages] = useState([]);
    const [PACKAGES_ID, setPACKAGES_ID] = useState([{ package_id: "", amount: "" }])



    // function for handle changes



    //  function for handle changes for select Coach 

    function handleChangeForSelectCoach(e) {
        setSelectedCoach(e.target.value);
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


    const getPackage = () => {

        show_package().then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {
                setPackages(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message);
            }
        })
    }



    // function for handle Submit

    function submit(e) {
        e.preventDefault();

        const data = {
            coach_id: SelectedCoach,
            package_ids: PACKAGES_ID

        };

        assign_packages(data).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);

            }
        });
    }




    // Packages ID Options


    const handleChangeInput = (index, event) => {
        const values = [...PACKAGES_ID]
        values[index][event.target.name] = event.target.value;
        setPACKAGES_ID(values)
    }

    const handleAddFields = () => {
        setPACKAGES_ID([...PACKAGES_ID, { package_id: "", amount: "" }])
    }

    const handleRemoveFields = id => {
        const values = [...PACKAGES_ID];
        values.splice(id, 1);
        setPACKAGES_ID(values);
    }




    useEffect(() => {
        getData();
    }, [setCoach]);

    useEffect(() => {
        getPackage();
    }, [setPackages]);





    return (
        <React.Fragment>
            <Helmet>
                <title>Assign Packages</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ContactMail />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Assign Package
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={2}>




                            {/* Select Coach */}

                            <Grid item xs={12} sm={12}>
                                <TextValidator
                                    id="select_coach_id"
                                    select
                                    label="Select Coach"
                                    fullWidth
                                    value={Coach.coach_name}
                                    onChange={handleChangeForSelectCoach}
                                    variant="outlined"
                                >
                                    {Coach.map((option,) => (
                                        <MenuItem key={option.coach_id} value={option.coach_id}>
                                            {option.coach_name}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>







                            {/* Packages  */}

                            <Grid item xs={12} sm={12}>
                                {PACKAGES_ID.map((inputField, index) => (
                                    <div key={index} >

                                        <TextField
                                            style={{ width: 250 }}
                                            margin='normal'
                                            id="package_for_id"
                                            name="package_id"
                                            select
                                            label="Select Package"
                                            fullWidth
                                            value={inputField.value}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            onChange={event => handleChangeInput(index, event)}
                                            variant="outlined"
                                        >
                                            {Packages.map((option) => (
                                                <MenuItem key={option.packages_id} value={option.packages_id}>
                                                    {option.packages_name}
                                                </MenuItem>
                                            ))}
                                        </TextField>


                                        <TextField
                                            style={{ width: 100, paddingLeft: "5px" }}
                                            margin='normal'
                                            variant="outlined"
                                            name="amount"
                                            required
                                            fullWidth
                                            id="amount_id"
                                            label="Amount"
                                            value={inputField.value}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            onChange={event => handleChangeInput(index, event)}
                                        />

                                        <IconButton disabled={PACKAGES_ID.length === 1} onClick={() => handleRemoveFields(index)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleAddFields()}
                                        >
                                            <AddIcon />
                                        </IconButton>

                                    </div>
                                ))}

                            </Grid>


                        </Grid>





                        {/* Submit */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onSubmit={submit}
                            submitButtonText="Submit"
                            className={classes.submit}
                        >
                            Assign Packages
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment >
    )
}