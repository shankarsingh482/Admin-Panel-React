import React, { useState } from 'react';
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
import FileBase64 from 'react-file-base64';
import { Helmet } from 'react-helmet'



import { create_ingredients_api } from './Ingredients_management_api'


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


export default function EditCoach(props) {
    const classes = useStyles();

    // useState Hooks
    const [FOOD_NAME, setFOOD_NAME] = useState('')
    const [UNIT, setUNIT] = useState('');
    const [QUANTITY, setQUANTITY] = useState('')
    const [FAT, setFAT] = useState('')
    const [CARBS, setCARBS] = useState('')
    const [PROTEIN, setPROTEIN] = useState('')
    const [FOOD_TYPE, setFOOD_TYPE] = useState('')
    const [VEGAN, setVEGAN] = useState('')
    const [EGGITARIAN, setEGGITARIAN] = useState('')
    const [NON_VEGETARIAN, setNON_VEGETARIAN] = useState('')
    const [VEGETARIAN, setVEGETARIAN] = useState('')
    const [CALORIES, setCALORIES] = useState('')
    const [INGREDIENT_TYPE, setINGREDIENT_TYPE] = useState('')
    const [INGREDIENTS_IMAGE, setINGREDIENTS_IMAGE] = useState('');




    // All Function


    function handleChangeOfFoodName(e) {
        setFOOD_NAME(e.target.value);               // function for handle changes of Food Name
    }

    function handleChangeOfUnits(e) {
        setUNIT(e.target.value)                     //function for handle changes of Units
    }

    function handleChangeOfQuantity(e) {
        setQUANTITY(e.target.value)                     //function for handle changes of Quantity
    }

    function handleChangeOfFat(e) {
        setFAT(e.target.value)                     //function for handle changes of Fat
    }

    function handleChangeOfCarbs(e) {
        setCARBS(e.target.value)                     //function for handle changes of Carbs
    }

    function handleChangeOfProtein(e) {
        setPROTEIN(e.target.value)                  // function for handle changes of Protein
    }

    function handleChangeOfCalories(e) {
        setCALORIES(e.target.value)                  // function for handle changes of Calories
    }

    function handleChangeOfFoodType(e) {
        setFOOD_TYPE(e.target.value)                  // function for handle changes of Food Type
    }

    function handleChangeOfVegan(e) {
        setVEGAN(e.target.value)                  // function for handle changes of Vegan

    }

    function handleChangeOfEggitarian(e) {
        setEGGITARIAN(e.target.value)                  // function for handle changes of Eggitarian

    }

    function handleChangeOfNonVegetarian(e) {
        setNON_VEGETARIAN(e.target.value)                  // function for handle changes of Non-Vegetarian

    }

    function handleChangeOfVegetarian(e) {
        setVEGETARIAN(e.target.value)                  // function for handle changes of Vegetarian

    }



    function handleChangeOfIngredientType(e) {
        setINGREDIENT_TYPE(e.target.value)                // function for handle changes of Ingredients Type
    }



    function getIngredientImage(files) {
        setINGREDIENTS_IMAGE(files.base64.split(',')[1]);         // function for handle Coach Images

    }




    const units = [
        {
            value: 'ml',
            label: "ml",                            // Units 
        },
        {
            value: 'grams',
            label: "grams",
        },
        {
            value: 'cube',
            label: "cube",
        },
        {
            value: 'slices',
            label: "slices",
        },
        {
            value: 'scoop',
            label: "scoop",
        },
    ];





    const food_type = [
        {
            value: 'dairy',
            label: "Dairy",                            // Food Types 
        },
        {
            value: 'nuts',
            label: "Nuts",
        },
        {
            value: 'meat',
            label: "Meat",
        },
        {
            value: 'alcohol',
            label: "Alcohol",
        },
        {
            value: 'sea food',
            label: "Sea Food",
        },
        {
            value: 'grains',
            label: "Grains",
        },
        {
            value: 'fruits',
            label: "Fruits",
        },
        {
            value: 'vegetables',
            label: "Vegetables",
        },


    ];



    const vegan = [
        {
            value: '0',
            label: "No",                            // Vegan 
        },
        {
            value: '1',
            label: "Yes",
        },

    ];



    const ingredient_type = [
        {
            value: '1',
            label: "VEG",                            // Ingredient Type 
        },
        {
            value: '2',
            label: "Non-Veg",
        },

    ];


    const eggitarian = [
        {
            value: '0',
            label: "No",                            // Eggiterian 
        },
        {
            value: '1',
            label: "Yes",
        },
    ];

    const non_vegetarian = [
        {
            value: '0',
            label: "No",                            // non-vegeterian 
        },
        {
            value: '1',
            label: "Yes",
        },
    ];

    const vegetarian = [
        {
            value: '0',
            label: "No",                            // vegeterian 
        },
        {
            value: '1',
            label: "Yes",
        },
    ];




    // function for handle Submit

    function submit(e) {
        e.preventDefault();             // Submit Function

        const user_data = {
            foodname: FOOD_NAME,
            ingredient_image: INGREDIENTS_IMAGE,
            ingredient_type: INGREDIENT_TYPE,
            unit: UNIT,
            quantity: QUANTITY,
            fat: FAT,
            carbs: CARBS,
            protein: PROTEIN,
            food_type: FOOD_TYPE,
            vegan: VEGAN,
            eggiterian: EGGITARIAN,
            non_vegiterian: NON_VEGETARIAN,
            vegiterian: VEGETARIAN,
            calories: CALORIES
        };

        create_ingredients_api(user_data).then((res) => {

            if (res.data !== undefined && res.data.RET_CODE === 200) {
                alert("Ingredients created successfully.");
                window.location.reload();
            } else {
                alert(`${res.data.message}`);
            }
        });
    }




    return (
        <React.Fragment>

            <Helmet>
                <title>Create Ingredients</title>

            </Helmet>
            <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <Paper elevation={3} className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonAddOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Ingredients
                    </Typography>
                    <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                        <Grid container spacing={2}>




                            {/* Food Name */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="food_name_id"
                                    label="Food Name"
                                    value={FOOD_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfFoodName}
                                />
                            </Grid>



                            {/* Ingredient Images */}

                            <Grid item xs={12} sm={6}>
                                <FileBase64
                                    multiple={false}
                                    onDone={getIngredientImage} />
                                <p style={{ paddingTop: "10px", fontSize: "10px", color: "red" }}>Choose only ( jpg, jpeg, png, gif )</p>
                            </Grid>


                            {/* Ingredient Type */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="ingredient_type_id"
                                    select
                                    label="Ingredients Type"
                                    fullWidth
                                    value={INGREDIENT_TYPE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfIngredientType}
                                    variant="outlined"
                                >
                                    {ingredient_type.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>


                            {/* Units */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="unit_id"
                                    select
                                    label="Units"
                                    fullWidth
                                    value={UNIT}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfUnits}
                                    variant="outlined"
                                >
                                    {units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>



                            {/* Food Type */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="food_type_id"
                                    select
                                    label="Food Type"
                                    fullWidth
                                    value={FOOD_TYPE}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfFoodType}
                                    variant="outlined"
                                >
                                    {food_type.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>



                            {/* Quantity */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="quantity_id"
                                    label="Quantity"
                                    value={QUANTITY}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfQuantity}
                                />
                            </Grid>


                            {/* Fat */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="fat_id"
                                    label="Fat(gm)"
                                    value={FAT}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfFat}
                                />
                            </Grid>


                            {/* Carbs */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="carbs_id"
                                    label="Carbs(gm)"
                                    value={CARBS}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfCarbs}
                                />
                            </Grid>



                            {/* Protein */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="protein_id"
                                    label="Protein(gm)"
                                    value={PROTEIN}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfProtein}
                                />
                            </Grid>


                            {/* Calories */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    variant="outlined"
                                    type="number"
                                    required
                                    fullWidth
                                    id="calories_id"
                                    label="Calories"
                                    value={CALORIES}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfCalories}
                                />
                            </Grid>


                            {/* Vegan */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="vegan_id"
                                    select
                                    label="Vegan"
                                    fullWidth
                                    value={VEGAN}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfVegan}
                                    variant="outlined"
                                >
                                    {vegan.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>



                            {/* Eggitarian */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="eggitarian_id"
                                    select
                                    label="Eggitarian"
                                    fullWidth
                                    value={EGGITARIAN}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfEggitarian}
                                    variant="outlined"
                                >
                                    {eggitarian.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>



                            {/* Non-Vegetarian */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="non_vegetarian_id"
                                    select
                                    label="Non-Vegetarian"
                                    fullWidth
                                    value={NON_VEGETARIAN}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfNonVegetarian}
                                    variant="outlined"
                                >
                                    {non_vegetarian.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
                            </Grid>




                            {/* Vegetarian */}

                            <Grid item xs={12} sm={6}>
                                <TextValidator
                                    id="vegetarian_id"
                                    select
                                    label="Vegetarian"
                                    fullWidth
                                    value={VEGETARIAN}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfVegetarian}
                                    variant="outlined"
                                >
                                    {vegetarian.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextValidator>
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
                            Create Ingredients
                        </Button>

                    </ValidatorForm>
                </Paper>
            </Container>

        </React.Fragment>
    )
}