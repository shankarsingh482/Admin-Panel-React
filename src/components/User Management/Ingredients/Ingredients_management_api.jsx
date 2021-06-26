
// Create Ingredients API

import axios from "axios";


export const create_ingredients_api = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"add_ingredients",
            {

                foodname: data.foodname,
                ingredient_image: data.ingredient_image,
                ingredient_type: data.ingredient_type,
                unit: data.unit,
                quantity: data.quantity,
                fat: data.fat,
                carbs: data.carbs,
                protein: data.protein,
                food_type: data.food_type,
                vegan: data.vegan,
                eggiterian: data.eggiterian,
                non_vegiterian: data.non_vegiterian,
                vegiterian: data.vegiterian,
                calories: data.calories
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
};






// Show Ingredients API



export function show_ingredients_api() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_ADMIN+"show_ingredients",
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};





// Edit Ingredients API


export const edit_ingredients_api = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"edit_ingredients",
            {
                ingredient_id: data.ingredient_id,
                foodname: data.foodname,
                unit: data.unit,
                quantity: data.quantity,
                fat: data.fat,
                carbs: data.carbs,
                protein: data.protein,
                food_type: data.food_type,
                vegan: data.vegan,
                eggiterian: data.eggiterian,
                non_vegiterian: data.non_vegiterian,
                vegiterian: data.vegiterian,
                calories: data.calories
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};





// Delete Ingredients API


export const delete_ingredients_api = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"delete_ingredients",
            {
                ingredient_id: data,

            },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};


