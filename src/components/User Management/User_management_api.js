// Create User API

import axios from "axios";

export const create_user = (user) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL_SUPER_ADMIN+"create_users",
      {
        user_name: user.user_name,
        password: user.password,
        user_type_id: user.user_type_id,
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        company_id: user.company_id,
        type_label: user.type_label,
        pin: user.pin,
        address_line1: user.address_line1,
        address_line2: user.address_line2,
        landmark: user.landmark,
        country_code: user.country_code

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




// Show User



export function show_users(props) {
  return axios
    .get(
      process.env.REACT_APP_API_URL_ADMIN+"show_users",
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



// Edit User


export const edit_user = (user) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL_ADMIN+"edit_users",
      {
        user_id: user.user_id,
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        status: user.status
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





// Delete User



export const delete_user = (user) => {
  return axios
    .post(
      process.env.REACT_APP_API_URL_ADMIN+"delete_user",
      {
        user_id: user,
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
      throw err;
    });
};





// Show User Type

export function show_user_type() {
  return axios
    .get(
      process.env.REACT_APP_API_URL_MASTER+"show_user_type",
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







// // Pin Code Drop Down

// export function pin_code() {
//   return axios
//     .get(
//       "http://13.126.55.56:3000/master/show_pin",
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err;
//     });
// };




// Country Code DropDown

export function country_code_api() {
  return axios
    .get(
      process.env.REACT_APP_API_URL_MASTER+"show_country",
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
