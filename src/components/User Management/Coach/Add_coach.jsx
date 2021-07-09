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


import { show_coach, show_coach_details, update_coach } from './Coach_management_api'



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


}))


export default function AddCoach(props) {
    const classes = useStyles();

    // useState Hooks
    const [Coach, setCoach] = useState([])
    const [CoachDetails, setCoachDetails] = useState([]);
    const [SelectedCoach, setSelectedCoach] = useState()
    const [FIRST_NAME, setFIRST_NAME] = useState('')
    const [MID_NAME, setMID_NAME] = useState('')
    const [LAST_NAME, setLAST_NAME] = useState('')
    const [USER_NAME, setUSER_NAME] = useState('')
    const [RATING, setRATING] = useState('')
    const [EMAIL, setEMAIL] = useState('')
    const [PHONE, setPHONE] = useState('')
    const [FAT, setFAT] = useState('')
    const [HEIGHT, setHEIGHT] = useState('')
    const [WEIGHT, setWEIGHT] = useState('')
    const [COACH_NAME, setCOACH_NAME] = useState('')
    const [AVAILABLE_SLOT, setAVAILABLE_SLOT] = useState('')
    const [NO_OF_PERSON_COACH, setNO_OF_PERSON_COACH] = useState('')
    const [TWITTER_LINK, setTWITTER_LINK] = useState('')
    const [FACEBOOK_LINK, setFACEBOOK_LINK] = useState('');
    const [INSTAGRAM_LINK, setINSTAGRAM_LINK] = useState('');
    const [ABOUT_ME, setABOUT_ME] = useState('');
    const [CERTIFICATE_NAME, setCERTIFICATE_NAME] = useState('');
    const [DESCRIPTION, setDESCRIPTION] = useState('');
    const [COACH_IMAGE, setCOACH_IMAGE] = useState('');
    const [SPECIALITY, setSPECIALITY] = useState('');
    const [COACH_TYPE, setCOACH_TYPE] = useState('');
    const [FITNESS_LEVEL, setFITNESS_LEVEL] = useState('');

    const [correctFIRST_NAME, setCorrectFIRST_NAME] = useState(true);
    const [correctLAST_NAME, setCorrectLAST_NAME] = useState(true);
    const [correctUSER_NAME, setCorrectUSER_NAME] = useState(true);
    const [correctEMAIL, setCorrectEMAIL] = useState(true);
    const [correctPHONE, setCorrectPHONE] = useState(true);
    const [correctRATING, setCorrectRATING] = useState(true);
    const [correctFAT, setCorrectFAT] = useState(true);
    const [correctHEIGHT, setCorrectHEIGHT] = useState(true);
    const [correctWEIGHT, setCorrectWEIGHT] = useState(true);
    const [correctCOACH_NAME, setCorrectCOACH_NAME] = useState(true);
    const [correctAVAILABLE_SLOT, setCorrectAVAILABLE_SLOT] = useState(true);
    const [correctNO_OF_PERSON_COACH, setCorrectNO_OF_PERSON_COACH] = useState(true);
    const [correctABOUT_ME, setCorrectABOUT_ME] = useState(true);
    const [correctDESCRIPTION, setCorrectDESCRIPTION] = useState(true);
    const [correctCOACH_IMAGE, setCorrectCOACH_IMAGE] = useState(true);
    const [correctSPECIALITY, setCorrectSPECIALITY] = useState(true);
    const [correctCOACH_TYPE, setCorrectCOACH_TYPE] = useState(true);
    const [correctFITNESS_LEVEL, setCorrectFITNESS_LEVEL] = useState(true);
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneno = /^[0-9]{3,14}$/;
    // function for handle changes

    //  function for handle changes for select Coach

    function handleChangeForSelectCoach(e) {
        setSelectedCoach(e.target.value);
        show_coach_details(e.target.value).then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setCoachDetails(res.data)
                console.log(res.data)
                setFIRST_NAME(res.data.fname)
                setMID_NAME(res.data.mname)
                setLAST_NAME(res.data.lname)
                setUSER_NAME(res.data.user_name)
                setRATING(res.data.rating_avg)
                console.log(res.data.rating_avg)
                setEMAIL(res.data.email)
                setPHONE(res.data.mobile)
                setFAT(res.data.fat)
                setHEIGHT(res.data.height)
                setWEIGHT(res.data.weight)
                setCOACH_NAME(res.data.coach_name)
                setAVAILABLE_SLOT(res.data.avilable_slot)
                setNO_OF_PERSON_COACH(res.data.no_of_person_coached)
                setTWITTER_LINK(res.data.twitter_link)
                setFACEBOOK_LINK(res.data.facebook_link)
                setINSTAGRAM_LINK(res.data.instagram_link)
                setABOUT_ME(res.data.about_me)
                setDESCRIPTION(res.data.description.join('\n'))
                //setCOACH_IMAGE(res.data.profile_image)
                setSPECIALITY(res.data.speacility)
                setCOACH_TYPE(res.data.coach_type)
                setFITNESS_LEVEL(res.data.fitness_level)
                setCorrectFIRST_NAME(true)
                setCorrectLAST_NAME(true)
                setCorrectUSER_NAME(true)
                setCorrectCOACH_NAME(true)
                setCorrectRATING(true)
                setCorrectEMAIL(true)
                setCorrectPHONE(true)
                setCorrectFAT(true)
                setCorrectHEIGHT(true)
                setCorrectWEIGHT(true)
                setCorrectSPECIALITY(true)
                setCorrectAVAILABLE_SLOT(true)
                setCorrectNO_OF_PERSON_COACH(true)
                setCorrectABOUT_ME(true)
                setCorrectDESCRIPTION(true)
                setCorrectCOACH_TYPE(true)
                setCorrectFITNESS_LEVEL(true)
                setCorrectCOACH_IMAGE(true)

            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }



    // function for handle change for first name

    function handleChangeOfFirstName(e) {
        setFIRST_NAME(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectFIRST_NAME(true)
        }
        else{
            setCorrectFIRST_NAME(false)
        }

    }

    // function for handle changes for Last Name

    function handleChangeOfLastName(e) {
        setLAST_NAME(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectLAST_NAME(true)
        }
        else{
            setCorrectLAST_NAME(false)
        }
    }

    // function for handle changes for Middle Name

    function handleChangeOfMidName(e) {
        e.target.value=(e.target.value).trim()
        setMID_NAME(e.target.value)
    }

    // function for handle changes for User Name

    function handleChangeOfUserName(e) {
        e.target.value=(e.target.value).trim()
        setUSER_NAME(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectUSER_NAME(true)
        }
        else{
            setCorrectUSER_NAME(false)
        }
    }

    // function for handle changes for Email Address

    function handleChangeOfEmail(e) {
        setEMAIL(e.target.value)
        if(e.target.value!=="" && e.target.value.match(mailformat)){
            setCorrectEMAIL(true)
        }
        else{
            setCorrectEMAIL(false)
        }
    }


    // function for handle changes for Mobile Number

    function handleChangeOfPhone(e) {
        setPHONE(e.target.value)
        if(e.target.value!=="" && e.target.value.match(phoneno)){
            setCorrectPHONE(true)
        }
        else{
            setCorrectPHONE(false)
        }
    }

    // function for handle changes for Fat

    function handleChangeOfFat(e) {
        setFAT(e.target.value)
        if(e.target.value!==""){
            setCorrectFAT(true)
        }
        else{
            setCorrectFAT(false)
        }
    }

    // function for handle changes for Height

    function handleChangeOfHeight(e) {
        setHEIGHT(e.target.value)
        if(e.target.value!==""){
            setCorrectHEIGHT(true)
        }
        else{
            setCorrectHEIGHT(false)
        }
    }


    // function for handle changes for Weight

    function handleChangeOfWeight(e) {
        setWEIGHT(e.target.value)
        if(e.target.value!==""){
            setCorrectWEIGHT(true)
        }
        else{
            setCorrectWEIGHT(false)
        }
    }

    // Handle changes for speciality

    function handleChangeOfSpeciality(e) {
        setSPECIALITY(e.target.value);
        if(e.target.value.trim()!==""){
            setCorrectSPECIALITY(true)
        }
        else{
            setCorrectSPECIALITY(false)
        }
    }
    // function for handle changes for Coach Name

    function handleChangeOfCoachName(e) {
        setCOACH_NAME(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectCOACH_NAME(true)
        }
        else{
            setCorrectCOACH_NAME(false)
        }
    }

    // function for handle changes for Available Slot

    function handleChangeOfAvailableSlot(e) {
        setAVAILABLE_SLOT(e.target.value)
        if(e.target.value!==""){
            setCorrectAVAILABLE_SLOT(true)
        }
        else{
            setCorrectAVAILABLE_SLOT(false)
        }
    }

    // function for handle changes for No. of Person Coached

    function handleChangeOfNoOfPersonCoach(e) {
        setNO_OF_PERSON_COACH(e.target.value)
        if(e.target.value!==""){
            setCorrectNO_OF_PERSON_COACH(true)
        }
        else{
            setCorrectNO_OF_PERSON_COACH(false)
        }
    }

    // function for handle changes for Twitter Link

    function handleChangeOfTwitterLink(e) {
        setTWITTER_LINK(e.target.value)

    }

    // function for handle changes for Facebook Link

    function handleChangeOfFacebookLink(e) {
        setFACEBOOK_LINK(e.target.value)

    }

    // function for handle changes for Instagram Link

    function handleChangeOfInstagramLink(e) {
        setINSTAGRAM_LINK(e.target.value)

    }

    // function for handle changes for Certificate Name

    // function handleChangeOfCertificateName(e) {
    //     setCERTIFICATE_NAME(e.target.value)

    // }

    // function for handle changes for About Me

    function handleChangeOfAboutMe(e) {
        setABOUT_ME(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectABOUT_ME(true)
        }
        else{
            setCorrectABOUT_ME(false)
        }
    }

    // function for handle changes for Description

    function handleChangeOfDescription(e) {
        setDESCRIPTION(e.target.value)
        if(e.target.value.trim()!==""){
            setCorrectDESCRIPTION(true)
        }
        else{
            setCorrectDESCRIPTION(false)
        }
    }


    // function for handle Coach Images

    function getCoachImage(files) {
        var okay= true
        if (!files.name.match(/\.(jpg|jpeg|png)$/)){
            okay=false
            setCorrectCOACH_IMAGE(false)
            alert("Please select an image file")
        }
        if(okay){
            setCOACH_IMAGE(files.base64.split(',')[1]);
            if(COACH_IMAGE!== null){
                setCorrectCOACH_IMAGE(true)
            }
            else{
                setCorrectCOACH_IMAGE(false)
            }
        }
    }


    // Handle changes for Coach Type

    function handleChangeOfCoachType(e) {
        setCOACH_TYPE(e.target.value);

    }


    // Handle changes for Fitness Level

    function handleChangeOfFitnessLevel(e) {
        setFITNESS_LEVEL(e.target.value);

    }

    // Handle changes for Rating
    function handleChangeOfRating(e){
        setRATING(e.target.value);
        // if(e.target.value>5 || e.target.value<1){
        //     setRATING(5)
        // }
        if(e.target.value!==""){
            setCorrectRATING(true)
        }
        else{
            setCorrectRATING(false)
        }
    }

    // function for handle Submit

    function submit(e) {
        e.preventDefault();
        var allGood= true
        //console.log(correctCOACH_IMAGE)
        if(correctFIRST_NAME && correctLAST_NAME && correctUSER_NAME && correctEMAIL && correctPHONE && correctFAT
             && correctHEIGHT && correctWEIGHT && correctCOACH_NAME && correctAVAILABLE_SLOT && correctNO_OF_PERSON_COACH
             && correctABOUT_ME && correctDESCRIPTION && correctCOACH_IMAGE && correctSPECIALITY && correctCOACH_TYPE && correctFITNESS_LEVEL){
                 allGood=true
             }
        else{
            allGood=false
        }
        if(FIRST_NAME.trim()=="" || FIRST_NAME==null || FIRST_NAME==undefined){
            setCorrectFIRST_NAME(false)
        }
        if(FIRST_NAME.trim()=="" || FIRST_NAME==null || FIRST_NAME==undefined){
            setCorrectFIRST_NAME(false)
        }
        if(!USER_NAME){
            setCorrectUSER_NAME(false)
            allGood=false
        }
        if(RATING>5 || RATING<1){
            setCorrectRATING(false)
            allGood=false
        }
        if(!RATING){
            setCorrectRATING(false)
            allGood=false
        }
        if(!EMAIL || !(EMAIL.match(mailformat))){
            setCorrectEMAIL(false)
            allGood=false
        }
        if(!PHONE || !(PHONE.match(phoneno))){
            setCorrectPHONE(false)
            allGood=false
        }
        if(!FAT){
            setCorrectFAT(false)
            allGood=false
        }
        if(HEIGHT=="" || HEIGHT==null || HEIGHT==undefined){
            setCorrectHEIGHT(false)
            allGood=false
        }
        if(WEIGHT=="" || WEIGHT==null || WEIGHT==undefined){
            setCorrectWEIGHT(false)
            allGood=false
        }
        if(!SPECIALITY){
            setCorrectSPECIALITY(false)
            allGood=false
        }
        if(!COACH_NAME){
            setCorrectCOACH_NAME(false)
            allGood=false
        }
        if(!AVAILABLE_SLOT){
            setCorrectAVAILABLE_SLOT(false)
            allGood=false
            if(AVAILABLE_SLOT==0){
                setCorrectAVAILABLE_SLOT(true)
                allGood=true
            }
        }
        if(!NO_OF_PERSON_COACH){
            setCorrectNO_OF_PERSON_COACH(false)
            allGood=false
            if(NO_OF_PERSON_COACH==0){
                setCorrectNO_OF_PERSON_COACH(true)
                allGood=true
            }
        }
        if(!COACH_TYPE){
            setCorrectCOACH_TYPE(false)
            allGood=false
        }
        if(!FITNESS_LEVEL){
            setCorrectFITNESS_LEVEL(false)
            allGood=false
        }
        if(!ABOUT_ME){
            setCorrectABOUT_ME(false)
            allGood=false
        }
        var seperatedDescription= DESCRIPTION;
        seperatedDescription=seperatedDescription.split('\n')
        seperatedDescription=seperatedDescription.filter(item=>item)
        var DescriptionString=seperatedDescription.join("^^")
        //setDESCRIPTION(DescriptionString)
        //console.log(DescriptionString)
        if(!DESCRIPTION){
            setCorrectDESCRIPTION(false)
            allGood=false
        }
        if(allGood){
            const coach_details_input = {
                coach_id: SelectedCoach,
                profile_image: COACH_IMAGE,
                fname: FIRST_NAME,
                mname: MID_NAME,
                lname: LAST_NAME,
                user_name: USER_NAME,
                rating_avg: RATING,
                coach_name: COACH_NAME,
                facebook_link: FACEBOOK_LINK,
                twitter_link: TWITTER_LINK,
                instagram_link: INSTAGRAM_LINK,
                speacility: SPECIALITY,
                avilable_slot: AVAILABLE_SLOT,
                no_of_person_coached: NO_OF_PERSON_COACH,
                about_me: ABOUT_ME,
                description: DescriptionString,
                height: HEIGHT,
                weight: WEIGHT,
                fat: FAT,
                fitness_level: FITNESS_LEVEL,
                email: EMAIL,
                mobile: PHONE,
                coach_type: COACH_TYPE,

            };

            update_coach(coach_details_input).then((res) => {

                if (res.data !== undefined && res.data.RET_CODE === 200) {
                    alert(res.data.message);
                    window.location.reload();
                } else {
                    //alert(res.data.message);
                    //console.log(res);
                    alert("There was some problem");
                }
            });
        }
        else{
            alert("Check all your inputs");
        }
    }



    // Coach Types

    const coach_types = [
        {
            value: 'Nutrition and Wellness',
            label: "Nutrition and Wellness",
        },
        {
            value: '1 On 1 Training',
            label: "1 On 1 Training",
        },
    ];


    // Fitness Level

    const fitness_level_list = [
        {
            value: 'Beginner',
            label: "Beginner",
        },
        {
            value: 'Intermediate',
            label: "Intermediate",
        },
        {
            value: 'Advanced',
            label: "Advanced",
        },
    ];




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

                <Grid item xs={12} align="center">
                    <Avatar alt={FIRST_NAME} src={CoachDetails.profile_image} className={classes.large} />
                    <FileBase64
                        multiple={false}
                        onDone={getCoachImage} />
                     <Typography style={{fontSize:'11px', color: '#757575', marginLeft: '8px'}}>**Upload image files (jpg/jpeg/png) only</Typography>
                </Grid>


                {/* First Name */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="first_name_id"
                        label="First Name"
                        style={(!correctFIRST_NAME) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={FIRST_NAME}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfFirstName}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>



                {/* Middle Name */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="mid_name_id"
                        label="Middle Name"
                        placeholder=""
                        value={MID_NAME}
                        onChange={handleChangeOfMidName}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>



                {/* Last Name */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="last_name_id"
                        label="Last Name"
                        style={(!correctLAST_NAME) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={LAST_NAME}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfLastName}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* User Name */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="user_name_id"
                        label="User Name"
                        style={(!correctUSER_NAME) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={USER_NAME}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfUserName}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* Coach Name */}

                <Grid item xs={12} sm={6}>
                    <TextValidator
                        variant="outlined"
                        required
                        fullWidth
                        id="coach_name_id"
                        label="Coach Name"
                        placeholder={CoachDetails.coach_name}
                        value={COACH_NAME}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfCoachName}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="rating"
                        variant="outlined"
                        required
                        fullWidth
                        label="Rating (1-5)"
                        type="number"
                        style={(!correctRATING) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={RATING}
                        onChange={handleChangeOfRating}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Certificate Name */}

                {/* <Grid item xs={12} sm={6}>
                    <TextValidator
                        variant="outlined"
                        required
                        fullWidth
                        id="certificate_id"
                        label="Certificate Name"
                        placeholder={CoachDetails.certificate_name}
                        value={CERTIFICATE_NAME}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfCertificateName}
                    />
                </Grid> */}



                {/* Email Address */}

                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        style={(!correctEMAIL) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={EMAIL}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        onChange={handleChangeOfEmail}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>



                {/* Phone Number */}

                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        variant="outlined"
                        required
                        fullWidth
                        label="Phone"
                        type="number"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        style={(!correctPHONE) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        value={PHONE}
                        onChange={handleChangeOfPhone}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Fat*/}

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="fat"
                        variant="outlined"
                        required
                        fullWidth
                        label="Fat(%)"
                        type="number"
                        style={(!correctFAT) ? {border: "2px solid red"}:{}}
                        placeholder=""
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={FAT}
                        onChange={handleChangeOfFat}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* Height */}

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="height"
                        variant="outlined"
                        required
                        fullWidth
                        label="Height(cm)"
                        type="number"
                        placeholder=""
                        style={(!correctHEIGHT) ? {border: "2px solid red"}:{}}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={HEIGHT}
                        onChange={handleChangeOfHeight}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Weight */}

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="weight"
                        variant="outlined"
                        required
                        fullWidth
                        label="Weight(kg)"
                        type="number"
                        placeholder=""
                        style={(!correctWEIGHT) ? {border: "2px solid red"}:{}}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={WEIGHT}
                        onChange={handleChangeOfWeight}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* Speciality */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="speciality"
                        variant="outlined"
                        required
                        fullWidth
                        label="Speciality"
                        placeholder=""
                        style={(!correctSPECIALITY) ? {border: "2px solid red"}:{}}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={SPECIALITY}
                        onChange={handleChangeOfSpeciality}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Coach Type */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="coach_type_id"
                        required
                        select
                        label="Coach Type"
                        fullWidth
                        style={(!correctCOACH_TYPE) ? {border: "2px solid red"}:{}}
                        value={COACH_TYPE}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfCoachType}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
                        {coach_types.map((option) => (
                            <MenuItem key={option.value} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>




                {/* Available Slot */}

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="available_slot_id"
                        variant="outlined"
                        required
                        fullWidth
                        label="Available Slot"
                        type="number"
                        placeholder=""
                        style={(!correctAVAILABLE_SLOT) ? {border: "2px solid red"}:{}}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={AVAILABLE_SLOT}
                        onChange={handleChangeOfAvailableSlot}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* No Of Person Coached */}

                <Grid item xs={12} sm={4}>
                    <TextField
                        id="no_person_coached_id"
                        variant="outlined"
                        required
                        fullWidth
                        label="No. Of Person Coached "
                        type="number"
                        placeholder=""
                        style={(!correctNO_OF_PERSON_COACH) ? {border: "2px solid red"}:{}}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={NO_OF_PERSON_COACH}
                        onChange={handleChangeOfNoOfPersonCoach}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* Fitness Level */}


                <Grid item xs={12} sm={4}>
                    <TextField
                        id="fitness_level_id"
                        required
                        select
                        label="Fitness Level"
                        fullWidth
                        style={(!correctFITNESS_LEVEL) ? {border: "2px solid red"}:{}}
                        value={FITNESS_LEVEL}
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={handleChangeOfFitnessLevel}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    >
                        {fitness_level_list.map((option) => (
                            <MenuItem key={option.value} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Facebook Link */}

                <Grid item xs={12}>
                    <TextField
                        id="facebook_link_id"
                        variant="outlined"
                        fullWidth
                        label="Facebook Link"
                        placeholder=""
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={FACEBOOK_LINK}
                        onChange={handleChangeOfFacebookLink}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* Twitter Link */}

                <Grid item xs={12}>
                    <TextField
                        id="twitter_link_id"
                        variant="outlined"
                        fullWidth
                        label="Twitter Link"
                        placeholder=""
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={TWITTER_LINK}
                        onChange={handleChangeOfTwitterLink}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>


                {/* Instagram Link */}

                <Grid item xs={12}>
                    <TextField
                        id="instagram_link_id"
                        variant="outlined"
                        fullWidth
                        label="Instagram Link"
                        placeholder=""
                        validators={['required']}
                        errorMessages={['this field is required']}
                        value={INSTAGRAM_LINK}
                        onChange={handleChangeOfInstagramLink}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                {/* About Me */}

                <Grid item xs={12}>
                    <Typography component="p" variant="p" style={{ color: '#757575', paddingBottom: '10px' }}>
                        About Me *
                    </Typography>
                    <TextareaAutosize
                        style={(!correctABOUT_ME) ? {border: "2px solid red", maxHeight: 100, width: '100%', boxSizing: 'border-box'}:{maxHeight: 100, width: '100%', boxSizing: 'border-box'}}
                        value={ABOUT_ME}
                        onChange={handleChangeOfAboutMe}
                    />
                </Grid>

                {/* Description */}

                <Grid item xs={12}>
                    <Typography component="p" variant="p" style={{ color: '#757575', paddingBottom: '10px' }}>
                        Description *
                    </Typography>
                    <TextareaAutosize
                        style={(!correctDESCRIPTION) ? {border: "2px solid red", maxHeight: 100, width: '100%', boxSizing: 'border-box'}:{maxHeight: 100, width: '100%', boxSizing: 'border-box'}}
                        value={DESCRIPTION}
                        onChange={handleChangeOfDescription}
                    />
                </Grid>
                <Typography style={{fontSize:'11px', color: '#757575', marginLeft: '8px'}}>**Press "Enter" key to change the paragraph while filling description</Typography>

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
                        Add Coach Details
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
                            Add Coach Details
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}
