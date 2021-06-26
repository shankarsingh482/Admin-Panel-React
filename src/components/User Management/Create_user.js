import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PersonAddOutlined from "@material-ui/icons/PersonAddOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Helmet } from 'react-helmet'

import { create_user, show_user_type, country_code_api } from './User_management_api'


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

export default function Create_user(props) {
    const classes = useStyles();

    // useState Hooks
    const [FIRST_NAME, setFIRST_NAME] = useState('')
    const [MID_NAME, setMID_NAME] = useState('')
    const [LAST_NAME, setLAST_NAME] = useState('')
    const [USER_NAME, setUSER_NAME] = useState('')
    const [EMAIL, setEMAIL] = useState('')
    const [PHONE, setPHONE] = useState('')
    const [ADDRESS_1, setADDRESS_1] = useState('')
    const [ADDRESS_2, setADDRESS_2] = useState('')
    const [USER_TYPE, setUSER_TYPE] = useState('')
    const [ADDRESS_TYPE, setADDRESS_TYPE] = useState('')
    const [PINCODE, setPINCODE] = useState('')
    const [LANDMARK, setLANDMARK] = useState('')
    const [PASSWORD, setPASSWORD] = useState('')
    const [COUNTRY_CODE, setCOUNTRY_CODE] = useState('')



    // function for handle changes



    // function for handle changes for User Name

    function handleChangeOfUserName(e) {
        setUSER_NAME(e.target.value)

    }


    // function for handle changes for First Name

    function handleChangeOfFirstName(e) {
        setFIRST_NAME(e.target.value)

    }


    // function for handle changes for Last Name

    function handleChangeOfLastName(e) {
        setLAST_NAME(e.target.value)

    }


    // function for handle changes for Middle Name

    function handleChangeOfMidName(e) {
        setMID_NAME(e.target.value)

    }


    // function for handle changes for Email Address

    function handleChangeOfEmail(e) {
        setEMAIL(e.target.value)

    }


    // function for handle changes for Mobile Number

    function handleChangeOfPhone(e) {
        setPHONE(e.target.value)

    }


    // function for handle changes for Address 1

    function handleChangeOfAddress1(e) {
        setADDRESS_1(e.target.value)

    }


    // function for handle changes for Address 2

    function handleChangeOfAddress2(e) {
        setADDRESS_2(e.target.value)

    }



    // function for handle changes for User Type

    function handleChangeOfUserType(select) {
        setUSER_TYPE(select.target.value)

    }


    // function for handle changes for Address Type

    function handleChangeOfAddressType(select) {
        setADDRESS_TYPE(select.target.value)

    }


    // function for handle changes for PinCode

    function handleChangeOfPincode(e) {
        setPINCODE(e.target.value)

    }


    // function for handle changes for Landmark

    function handleChangeOfLandmark(e) {
        setLANDMARK(e.target.value)

    }


    // function for handle changes for Password

    function handleChangeOfPassword(e) {
        setPASSWORD(e.target.value)

    }

    // function for handle changes for CountryCode

    function handleChangeOfCountryCode(e) {
        setCOUNTRY_CODE(e.target.value)

    }



    // function for handle Submit

    function submit(e) {
        e.preventDefault();

        const user = {
            user_name: USER_NAME,
            password: PASSWORD,
            user_type_id: USER_TYPE,
            fname: FIRST_NAME,
            mname: MID_NAME,
            lname: LAST_NAME,
            email: EMAIL,
            mobile: PHONE,
            company_id: '',
            type_label: ADDRESS_TYPE,
            pin: PINCODE,
            address_line1: ADDRESS_1,
            address_line2: ADDRESS_2,
            landmark: LANDMARK,
            country_code: COUNTRY_CODE
        };

        create_user(user).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert("User created successfully.");
                window.location.reload();
            } else {
                //alert(`${res.data.message}`);
                alert("There was some problem.");
            }
        });
    }




    // User Types & Pin Code Drop Down

    const [ShowUserType, setShowUserType] = useState([]);
    const [CountryCode, setCountryCode] = useState([]);



    const getData = () => {
        show_user_type().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setShowUserType(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        })

        country_code_api().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setCountryCode(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        })
    }






    // Address Types

    const address_types = [
        {
            value: 'home',
            label: "Home",
        },
        {
            value: 'office',
            label: "Office",
        },
    ];




    useEffect(() => {
        getData();
    }, [setShowUserType]);



    return (
        <React.Fragment>
            <Helmet>
                <title>Create User</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create User
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={1}>

                            {/* First Name */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="first_name_id"
                                    label="First Name"
                                    name="FIRST_NAME"
                                    autoComplete="firstNameId"
                                    value={FIRST_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfFirstName}
                                />
                            </Grid>



                            {/* Middle Name */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    fullWidth
                                    id="mid_name_id"
                                    label="Middle Name"
                                    name="MID_NAME"
                                    autoComplete="midNameId"
                                    value={MID_NAME}
                                    onChange={handleChangeOfMidName}
                                />
                            </Grid>



                            {/* Last Name */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="last_name_id"
                                    label="Last Name"
                                    name="LAST_NAME"
                                    autoComplete="lastNameId"
                                    value={LAST_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfLastName}
                                />
                            </Grid>



                            {/* User Name */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="user_name_id"
                                    label="User Name"
                                    name="USER_NAME"
                                    autoComplete="userNameId"
                                    value={USER_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfUserName}
                                />
                            </Grid>



                            {/* Email Address */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="EMAIL"
                                    autoComplete="EMAIL"
                                    value={EMAIL}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                    onChange={handleChangeOfEmail}
                                />
                            </Grid>

                            {/* Country Code Dropdown */}


                            <Grid item xs={12} sm={4}>
                                <TextValidator
                                    id="country_code_id"
                                    required={true}
                                    select
                                    label="Country Code"
                                    fullWidth
                                    value={COUNTRY_CODE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfCountryCode}
                                    variant="outlined"
                                >
                                    {CountryCode.map((option) => (
                                        <MenuItem value={option.country_code}>
                                            {option.country_name}{"("} {option.phone_code} {")"}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>




                            {/* Phone Number */}

                            <Grid item xs={12} sm={8}>
                                <TextValidator
                                    id="phone"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Phone"
                                    type="number"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    name="PHONE"
                                    autoComplete="phone"
                                    value={PHONE}
                                    onChange={handleChangeOfPhone}
                                />
                            </Grid>


                            {/* Address 1 */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address1_id"
                                    label="Address 1"
                                    name="ADDRESS 1"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete="address1"
                                    value={ADDRESS_1}
                                    onChange={handleChangeOfAddress1}
                                />
                            </Grid>


                            {/* Address 2 */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address2_id"
                                    label="Address 2"
                                    name="ADDRESS 2"
                                    autoComplete="address2"

                                    value={ADDRESS_2}
                                    onChange={handleChangeOfAddress2}
                                />
                            </Grid>



                            {/* User Type */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="user_type_id"
                                    select
                                    label="User Type"
                                    fullWidth
                                    value={USER_TYPE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfUserType}
                                    variant="outlined"
                                >
                                    {ShowUserType.map((option) => (
                                        <MenuItem key={option.user_type_id} value={option.user_type_id}>
                                            {option.user_type}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>




                            {/* Address Type */}


                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="address_type_id"
                                    select
                                    label="Address Type"
                                    fullWidth
                                    value={ADDRESS_TYPE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfAddressType}
                                    variant="outlined"
                                >
                                    {address_types.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>








                            {/* Pin Code */}


                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="pin_id"
                                    required={true}
                                    type="number"
                                    label="PIN CODE"
                                    fullWidth
                                    value={PINCODE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfPincode}
                                    variant="outlined"
                                >
                                </TextValidator>
                            </Grid>







                            {/* LandMark */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="landmark_id"
                                    label="Landmark"
                                    name="LANDMARK"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    autoComplete="landmark"
                                    value={LANDMARK}
                                    onChange={handleChangeOfLandmark}
                                />
                            </Grid>



                            {/* Password */}

                            <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="PASSWORD"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={PASSWORD}
                                    onChange={handleChangeOfPassword}
                                />
                            </Grid>


                        </Grid>



                        {/* Submit */}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create User
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}