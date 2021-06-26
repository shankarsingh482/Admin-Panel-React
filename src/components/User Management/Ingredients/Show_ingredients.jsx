
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { show_ingredients_api, edit_ingredients_api, delete_ingredients_api } from './Ingredients_management_api';
import { Helmet } from 'react-helmet'





export default function ShowIngredients(props) {
    const [data, setData] = useState([]);


    const getData = () => {
        show_ingredients_api().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setData(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }



    function delete_data() {
        alert("You are in delete_data function")
    }




    const handleRowUpdate = (newData, oldData, resolve) => {

        edit_ingredients_api(newData).then(res => {
            if (res !== undefined && res.RET_CODE === 200) {
                setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    alert(res.message)
                    resolve()
                }, 1000);
                resolve()
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



    const handleRowDelete = (oldData, resolve) => {
        delete_ingredients_api(oldData.ingredient_id)
            .then(res => {
                if (res !== undefined && res.RET_CODE === 200) {
                    setTimeout(() => {
                        alert(res.message)
                        window.location.reload();
                        resolve()
                    }, 1000);
                    resolve()

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




    useEffect(() => {
        getData();
    }, [setData]);





    return (
        <React.Fragment>
            <Helmet>
                <title>Show Ingredients</title>

            </Helmet>
            <MaterialTable
                title="All Ingredients"
                columns={[
                    { title: 'Food Name', field: 'foodname' },
                    {
                        title: 'Unit',
                        field: 'unit',
                        lookup: { ml: 'ml', grams: 'grams', cube: 'cube', slices: 'slices', scoop: 'scoop' }
                    },
                    { title: 'Quantity', field: 'quantity' },
                    { title: 'Fat(gm)', field: 'fat' },
                    { title: 'Carbs(gm)', field: 'carbs' },
                    { title: 'Protein(gm)', field: 'protein' },
                    { title: 'Calories', field: 'calories' },
                    {
                        title: 'Food Type',
                        field: 'food_type',
                        lookup: { dairy: 'Dairy', nuts: 'Nuts', meat: 'Meat', alcohol: 'Alcohol', seafood: 'SeaFood', grains: 'grains', fruits: 'Fruits', vegetables: 'Vegetables' }
                    },
                    {
                        title: 'Vegan',
                        field: 'vegan',
                        lookup: { 0: 'No', 1: 'Yes' }
                    },
                    {
                        title: 'Eggitarian',
                        field: 'eggiterian',
                        lookup: { 0: 'No', 1: 'Yes' }
                    },
                    {
                        title: 'Non-Vegetarian',
                        field: 'non_vegiterian',
                        lookup: { 0: 'No', 1: 'Yes' }
                    },
                    {
                        title: 'Vegetarian',
                        field: 'vegiterian',
                        lookup: { 0: 'No', 1: 'Yes' }
                    },
                    {
                        title: 'Ingredient Type',
                        field: 'ingredient_type',
                        lookup: { 1: 'Veg', 2: 'Non-Veg' }
                    },
                ]}


                data={data}

                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
                options={{
                    exportButton: true,
                    selection: true,
                    search: true,
                    pageSizeOptions:[5,10,20,data.length],
                    exportAllData: true,
                }}
                actions={[
                    {
                        tooltip: 'Remove All Selected Users',
                        icon: 'delete',
                        onClick: delete_data
                    },
                ]}
            />
        </React.Fragment>

    )
}

