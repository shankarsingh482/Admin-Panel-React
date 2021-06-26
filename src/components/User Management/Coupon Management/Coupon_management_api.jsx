import axios from "axios";

// Create Coupon

export const create_coupon = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"create_discount_coupon",
            {
                discount_type: data.discount_type,
                
                discount_coupon: data.discount_name,
                discount_name: data.discount_name,
                time_use: data.time_use,
                discount_amount: data.discount_amount,
                expiry_date: data.expiry_date
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }
        )
        .then((response) => {
          console.log({
            status:response.status,
            message: 'created Successfully'
          });
            return response;
        })
        .catch((err) => {
            return err;
        });
       

};

//Show Coupon

export function show_coupon() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_ADMIN+"show_discount_coupon",
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

//Delete Coupon

export const delete_coupon = (coupon) => {
    return axios
      .post(
        process.env.REACT_APP_API_URL_ADMIN+"modified_discount_coupon",
        {
            discount_id: coupon.discount_id,
            active: coupon.active,
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

  //Edit Coupon

  export const edit_coupon = (coupon) => {
    return axios
      .post(
        process.env.REACT_APP_API_URL_ADMIN+"update_coupon",
        {
            discount_id: coupon.discount_id,
            active: coupon.active,
            time_use: coupon.count,
            expiry_date: coupon.expiry_date,    
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