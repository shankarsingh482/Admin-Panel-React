

import axios from "axios";


// Show Testimonials API



export function show_testimonials_api() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_ADMIN+"show_testimonial",
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



// Approve Testimonials API

export const approve_testimonials_api = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"approve_testimonial",
            {

                testimonial_id: data.testimonial_id,
                approve: data.approve
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


// Delete Testimonials API

export const delete_testimonials_api = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"delete_testimonial",
            {

                testimonial_id: data.testimonial_id
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






