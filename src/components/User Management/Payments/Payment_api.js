
import axios from "axios";

export function allPaymentList(props) {
  return axios
    .get(
      process.env.REACT_APP_API_URL_PAYMENT_ADMIN,
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

export function show_coach() {
  return axios
      .get(
          process.env.REACT_APP_API_URL_ADMIN+"show_coach_dropdown",
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




export function show_coach_clients(data) {
  return axios
      .post(
        'http://13.126.55.56:3005/admin/show_payment_coach_by',
          {
              coach_id: data,
          },
          {
              headers: {
                  Authorization: localStorage.getItem("token"),
              },
          },

      )
      .then((response) => {
          return response.data;
      })
      .catch((err) => {
          return err;
      });
};






