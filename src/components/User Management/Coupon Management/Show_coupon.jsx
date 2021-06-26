
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import { show_coupon, delete_coupon, edit_coupon } from './Coupon_management_api';
import { Divider, Paper, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet'


export default function Show_coupon(props) {
    const [data, setData] = useState([]);
    const getData = () => {
      show_coupon().then((res) => {
          if (res !== undefined && res.RET_CODE === 200) {
              setData(res.data)
              console.log(res.data);
          }
          if (res.RET_CODE === 201) {
              alert(res.message)
          }
      });
    }

    const handleRowDelete = (oldData, resolve) => {
      delete_coupon(oldData)
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

    const useStyles = makeStyles((theme) => ({
      center: {
        marginLeft: "auto",
        marginRight: "auto"
      }
  
  }));
  const classes = useStyles();

  const handleRowUpdate = (newData, oldData, resolve) => {

    edit_coupon(newData).then(res => {
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



    return (
      
        <React.Fragment>
      <Helmet>
        <title>Coupons</title>

      </Helmet>
      
      <Grid item lg={9} xs={12} className={classes.center} >
      <MaterialTable
        title="Coupons"
        columns={[
          { title: 'Coupon Code', field: 'dicount_coupon', editable: 'never' },
          // { title: 'Short Name', field: 'discount_name', editable: 'never' },
          { title: 'Discount', field: 'discount_amount', editable: 'never' },
          { title: 'Expiry Date (YYYY-MM-DD)', field: 'expiry_date' },
          { title: 'Redeem Limit', field: 'count' },
          { title: 'Active', field: 'active', lookup: { 0: 'No', 1: 'Yes' }, }
        ]}


        data={data}

        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          // onRowDelete: (oldData) =>
          //   new Promise((resolve) => {
          //     handleRowDelete(oldData, resolve)
          //   }),
        }}
        options={{
          exportButton: true,
          search: true,
          pageSizeOptions:[5,10,20,data.length],
          exportAllData: true,
        }}
      />
      </Grid>
    </React.Fragment>
    )
}

