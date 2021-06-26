
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import { allPaymentList } from './Payment_api'
import { Helmet } from 'react-helmet'


export default function AllPayments(props) {

  const [data, setData] = useState([]);

  const getData = () => {
    allPaymentList().then((res) => {

      if (res !== undefined && res.RET_CODE === 200) {
        setData(res.data)
      }
      if (res.RET_CODE === 201) {
        alert(res.message)
      }
    });
  }


  useEffect(() => {
    getData();
  }, [setData]);





  return (
    <React.Fragment>
      <Helmet>
        <title>All Payments</title>

      </Helmet>
      <MaterialTable
        title="All Payments"
        columns={[
          { title: 'Payment ID', field: 'package_enroll_master_id' },
          { title: 'User', field: 'user_name' },
          { title: 'Coach', field: 'coach_name' },
          {title:'Date',field :'date'},
          {title:'Amount',field:'amount'},
          {title:'package_name',field:'package_name'},
          {title:'Razorpay ID',field:'razorpay_payment_id'},
          { title: 'Order ID', field: 'razorpay_order_id' },

        ]}
        data={data}
        options={{
          exportButton: true,
          selection: true,
          search: true,
          pageSizeOptions:[5,10,20],
          exportAllData: true,
        }}
      />
    </React.Fragment>

  )
}

