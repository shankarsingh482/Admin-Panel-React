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
import { create_package } from './Package_management_api';
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






export default function Packages(props) {
    const classes = useStyles();

    // useState Hooks
    const [PACKAGE_NAME, setPACKAGE_NAME] = useState('')
    const [TYPE_OF_PACKAGE, setTYPE_OF_PACKAGE] = useState('')
    const [PACKAGE_FOR, setPACKAGE_FOR] = useState('')
    const [DESCRIPTION, setDESCRIPTION] = useState([{ value: "" }])
    const [DURATION_VALUE, setDURATION_VALUE] = useState('')
    const [DURATION_TYPE, setDURATION_TYPE] = useState('')
    const [SESSION, setSESSION] = useState('')


    // function for handle changes



    // function for handle changes for Package Name

    function handleChangeOfPackageName(e) {
        setPACKAGE_NAME(e.target.value)

    }


    // function for handle changes for Type Of Package

    function handleChangeOfTypeOfPackage(e) {
        setTYPE_OF_PACKAGE(e.target.value)

    }


    // function for handle changes for Package For

    function handleChangeOfPackageFor(e) {
        setPACKAGE_FOR(e.target.value)

    }



    // function for handle changes for Duration Value

    function handleChangeOfDurationValue(e) {
        setDURATION_VALUE(e.target.value)

    }


    // function for handle changes for Duration Type

    function handleChangeOfDurationType(e) {
        setDURATION_TYPE(e.target.value)

    }


    // function for handle changes for Session

    function handleChangeOfSession(e) {
        setSESSION(e.target.value)

    }








    // function for handle Submit

    function submit(e) {
        e.preventDefault();

        const data = {
            package_name: PACKAGE_NAME,
            package_for: PACKAGE_FOR,
            duration: DURATION_VALUE + " " + DURATION_TYPE,
            session: SESSION,
            description: DESCRIPTION

        };

        create_package(data).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert("Package created successfully.");
                window.location.reload();
            } else {
                alert(`${res.data.message}`);
            }
        });
    }



    // Description Options


    const handleChangeInput = (index, event) => {
        const values = [...DESCRIPTION]
        values[index][event.target.name] = event.target.value;
        setDESCRIPTION(values)
    }

    const handleAddFields = () => {
        setDESCRIPTION([...DESCRIPTION, { value: "" }])
    }

    const handleRemoveFields = id => {
        const values = [...DESCRIPTION];
        values.splice(id, 1);
        setDESCRIPTION(values);
    }












    // Type of package

    const type_of_package = [
        {
            value: 'duration',
            label: "Duration",
        },
        {
            value: 'session',
            label: "Session",
        },
    ];



    // Package For

    const package_for = [
        {
            value: "single",
            label: "Single",
        },
        {
            value: 'couple',
            label: "Couple",
        },
        {
            value: 'family',
            label: "Family",
        },
        {
            value: 'everyone',
            label: "Everyone",
        },
    ];


    // Duration Type

    const duration_type = [
        {
            value: "days",
            label: "Days",
        },
        {
            value: 'week',
            label: "Week",
        },
        {
            value: 'year',
            label: "Year",
        },
    ];



    function duration() {

        if (TYPE_OF_PACKAGE === 'duration') {
            return (<> <Grid item xs={8} sm={8}>
                <TextValidator
                    id="duration_id"
                    label="Duration"
                    fullWidth
                    type="number"
                    value={DURATION_VALUE}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    onChange={handleChangeOfDurationValue}
                    variant="outlined"
                >
                </TextValidator>
            </Grid>
                <Grid item xs={4} sm={4}>
                    <TextValidator
                        id="duration_type_id"
                        label="Duration Type"
                        select
                        fullWidth
                        value={DURATION_TYPE}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfDurationType}
                        variant="outlined"
                    >
                        {duration_type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextValidator>
                </Grid>
            </>
            )
        }
        else if (TYPE_OF_PACKAGE === 'session') {
            return <Grid item xs={12} sm={12}>
                <TextValidator
                    id="session_id"
                    type="number"
                    label="Session"
                    fullWidth
                    value={SESSION}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    onChange={handleChangeOfSession}
                    variant="outlined"
                >
                </TextValidator>
            </Grid>
        }
        else {
            return
        }
    }

 



    return (
        <React.Fragment>
            <Helmet>
                <title>Create Packages</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ContactMail />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Package
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={1}>

                            {/* Name Of Package */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="package_name_id"
                                    label="Package Name"
                                    name="PACKAGE_NAME"
                                    autoComplete="packagenameid"
                                    value={PACKAGE_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfPackageName}
                                />
                            </Grid>


                            {/* Package For  */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="package_for_id"
                                    select
                                    label="Package For"
                                    fullWidth
                                    value={PACKAGE_FOR}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfPackageFor}
                                    variant="outlined"
                                >
                                    {package_for.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>



                            {/*Type Of Package */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="type_of_package_id"
                                    select
                                    label="Type Of Package"
                                    fullWidth
                                    value={TYPE_OF_PACKAGE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfTypeOfPackage}
                                    variant="outlined"
                                >
                                    {type_of_package.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>






                            {duration()}







                            {/* Description  */}

                            <Grid item xs={12} sm={12}>
                                {DESCRIPTION.map((inputField, index) => (
                                    <div key={index} >
                                        <TextField
                                            style={{ width: 360 }}
                                            margin='normal'
                                            name="value"
                                            label="Description"
                                            variant="outlined"
                                            value={inputField.value}
                                            onChange={event => handleChangeInput(index, event)}
                                        />

                                        <IconButton disabled={DESCRIPTION.length === 1} onClick={() => handleRemoveFields(index)}>
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
                            Create Packages
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment >
    )
}