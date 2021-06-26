
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { show_users, edit_user, delete_user } from './User_management_api'
import { Helmet } from 'react-helmet'


export default function Users(props) {

  const [data, setData] = useState([]);

  const getData = () => {
    show_users().then((res) => {

      if (res !== undefined && res.RET_CODE === 200) {
        setData(res.user_data)
      }
      if (res.RET_CODE === 201) {
        alert(res.message)
      }
    });
  }



  function delete_data() {
    // alert("You are in delete_data function")
    return;
  }




  const handleRowUpdate = (newData, oldData, resolve) => {

    edit_user(newData).then(res => {
      if (res !== undefined && res.RET_CODE === 200) {
        setTimeout(() => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          alert(res.message)
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



  const handleRowDelete = (oldData, resolve) => {
    delete_user(oldData.user_id)
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
        <title>Users List</title>

      </Helmet>
      <MaterialTable
        title="User List"
        columns={[
          { title: 'First Name', field: 'fname' },
          { title: 'Last Name', field: 'lname' },
          { title: 'Email', field: 'email' },
          { title: 'Mobile', field: 'mobile' },
          {
            title: 'User Type',
            field: 'user_type_id',
            editable: 'never',
            lookup: { 0: 'SuperAdmin', 1: 'Admin', 2: 'User', 3: 'Coach' },

          },
          {
            title: 'Status',
            field: 'status',
            lookup: { unapproved: 'UNAPPROVED', approved: 'APPROVED', terminated: 'TERMINATED' }
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

