import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PersonAddOutlined from "@material-ui/icons/PersonAddOutlined";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FileBase64 from 'react-file-base64';
import { Helmet } from 'react-helmet'
import { show_workout_type_api } from './Workout_api';


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


export default function CreateWorkout(props) {
    const classes = useStyles();

    // useState Hooks
    const [FOOD_NAME, setFOOD_NAME] = useState('')
    const [Image_Name, setImage_Name] = useState([{ display_name: "", file_name: "", workout_file: "" }])
    const [INGREDIENTS_IMAGE, setINGREDIENTS_IMAGE] = useState('');
    const [Workout_type, setWorkout_type] = useState([]);
    const [Workout_type_by_user, setWorkout_type_by_user] = useState('');



    // All Function


    function handleChangeOfFoodName(e) {
        setFOOD_NAME(e.target.value);               // function for handle changes of Food Name
    }


    function getIngredientImage(files) {
        setINGREDIENTS_IMAGE(files.base64.split(',')[1]);         // function for handle Coach Images

    }


    function handleWorkoutType(e) {
        setWorkout_type_by_user(e.target.value)
        console.log(e.target.value)
    }


    const getWorkoutType = () => {
        show_workout_type_api().then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {
                setWorkout_type(res.data)
            } else {
                alert(res.message);
            }
        })
    }


    //  Workout Options


    const handleChangeInput = (index, event) => {
        const values = [...Image_Name]
        values[index][event.target.name] = event.target.value;
        setImage_Name(values)
        console.log(values)
    }

    const handleAddFields = () => {
        setImage_Name([...Image_Name, { display_name: "", file_name: "", workout_file: "" }])
    }

    const handleRemoveFields = id => {
        const values = [...Image_Name];
        values.splice(id, 1);
        setImage_Name(values);
    }



    // function for handle Submit

    function submit(e) {
        e.preventDefault();             // Submit Function

        // const user_data = {
        //     foodname: FOOD_NAME,
        //     ingredient_image: INGREDIENTS_IMAGE,
        //     ingredient_type: INGREDIENT_TYPE,
        //     unit: UNIT,
        //     quantity: QUANTITY,
        //     fat: FAT,
        //     carbs: CARBS,
        //     protein: PROTEIN,
        //     food_type: FOOD_TYPE,
        //     vegan: VEGAN,
        //     eggiterian: EGGITARIAN,
        //     non_vegiterian: NON_VEGETARIAN,
        //     vegiterian: VEGETARIAN,
        //     calories: CALORIES
        // };

        // create_ingredients_api(user_data).then((res) => {

        //     if (res.data !== undefined && res.data.RET_CODE === 200) {
        //         alert("Ingredients created successfully.");
        //         window.location.reload();
        //     } else {
        //         alert(`${res.data.message}`);
        //     }
        // });
    }



    useEffect(() => {
        getWorkoutType();
    }, [setWorkout_type]);


    return (
        <React.Fragment>

            <Helmet>
                <title>Create Workouts</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Workouts
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={2}>


                            {/* Workout Type */}

                            <TextField
                                margin='normal'
                                id="workout_type"
                                name="workout_type"
                                select
                                label="Workout Type"
                                fullWidth
                                value={Workout_type_by_user}
                                onChange={handleWorkoutType}
                                variant="outlined"
                            >
                                {Workout_type.map((option) => (
                                    <MenuItem key={option.master_id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>



                            {/* Workout Image */}
                            {/* 
                            <Grid item xs={12} sm={6}>
                                <FileBase64
                                    multiple={false}
                                    onDone={getIngredientImage} />
                            </Grid> */}




                            {/* Workout Details  */}

                            <Grid item xs={12} sm={12}>
                                {Image_Name.map((inputField, index) => (
                                    <div key={index} >

                                        <TextField
                                            style={{ width: 250 }}
                                            margin='normal'
                                            id="display_name_id"
                                            name="display_name"
                                            label="Name"
                                            fullWidth
                                            value={inputField.value}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            onChange={event => handleChangeInput(index, event)}
                                            variant="outlined"
                                        >

                                        </TextField>


                                        <FileBase64
                                            multiple={false}
                                            onDone={event => handleChangeInput(index, event)} />

                                        <IconButton disabled={Image_Name.length === 1} onClick={() => handleRemoveFields(index)}>
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
                            className={classes.submit}
                        >
                            Create Workouts
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}