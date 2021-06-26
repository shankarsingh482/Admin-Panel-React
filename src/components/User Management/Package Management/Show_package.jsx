
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { show_package, delete_packege } from './Package_management_api';

import { Helmet } from 'react-helmet'



export default function Show_package(props) {
    const [data, setData] = useState([]);



    const getData = () => {
        show_package().then((res) => {

            if (res !== undefined && res.RET_CODE === 200) {
                setData(res.data)
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });
    }



    const handleRowDelete = (oldData, resolve) => {
        delete_packege(oldData.packages_id)
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


    useEffect(() => {
        getData();
    }, [setData]);


    return (
        <React.Fragment>

            <Helmet>
                <title>Packages List</title>

            </Helmet>
            <MaterialTable
                title="Packages"
                columns={[
                    { title: 'Package Name', field: 'packages_name' },
                    { title: 'Description', field: 'descriptions' },
                    { title: 'Duration', field: 'duration' },
                    { title: 'Session', field: 'session' },
                    { title: 'Package For', field: 'packages_for' }
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
                    // selection: true,
                }}
                // actions={[
                //     {
                //         tooltip: 'Remove All Selected Users',
                //         icon: 'delete',
                //         onClick: delete_data
                //     },
                // ]}
            />
        </React.Fragment>
    )
}

