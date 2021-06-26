
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from "@material-ui/core/styles";
import { show_package_for_coach, show_coach, delete_coach_packege } from './Package_management_api';
import {
    MenuItem, TextField, Button
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    
    heading: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    


}))

export default function List_Of_assigned_packages(props) {

    const classes = useStyles();
    const [Coach, setCoach] = useState([])
    const [SelectedCoach, setSelectedCoach] = useState('')
    const [SelectedCoachName, setSelectedCoachName] = useState('')
    const [data, setData] = useState([]);

    function handleChangeForSelectCoach(e) {
        setSelectedCoach(e.target.value);
    }


    function sendDetails() {
        show_package_for_coach(SelectedCoach).then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                for(var i=0;i<res.package_details.length;i++){
                    if(res.package_details[i].descriptions){
                        res.package_details[i].descriptions=res.package_details[i].descriptions.replaceAll("^^", "\n")
                    }
                }
                //console.log(res.package_details)
                setData(res.package_details)
            }
            else {
                alert(res.message)

            }
        })
    }

    const handleRowDelete = (oldData, resolve) => {
        delete_coach_packege(oldData.packages_id, SelectedCoach)
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

    function showData() {
        if (data) {
            return (
                <>
                    <MaterialTable
                        title="Packages"
                        columns={[
                            { title: 'Package Name', field: 'packages_name' },
                            // { title: 'Description', field: 'descriptions' },
                            { title: 'Duration', field: 'duration' },
                            { title: 'Session', field: 'session' },
                            { title: 'Type Of Packages', field: 'type_of_packege' },
                            { title: 'Price', field: 'prize' }
                        ]}


                        data={data}

                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                        options={{
                            exportButton: true,
                            //selection: true,
                        }}
                    // actions={[
                    //     {
                    //         tooltip: 'Remove All Selected Users',
                    //         icon: 'delete',
                    //         onClick: delete_data
                    //     },
                    // ]}
                    />
                </>

            )
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




    useEffect(() => {
        getData();
    }, [setCoach]);


    return (
        <React.Fragment>
            <Helmet>
                <title>List Of Assigned Packages</title>

            </Helmet>
            <Typography component="h1" variant="h4" className={classes.heading}>
                    Coach's assigned packages
            </Typography>
            <TextField
                id="select_coach_id"
                select
                label="Select Coach"
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
            </TextField>
            <Button variant="outlined" onClick={sendDetails} variant="contained" color="primary" 
            style={{marginTop: "10px", marginBottom: "15px"}}>Show</Button>
            {showData()}

        </React.Fragment>
    )
}

