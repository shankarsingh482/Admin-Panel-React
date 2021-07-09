

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


export function show_user() {
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


  export const sendTestimonials = (data) => {
    return axios
        .post(
            process.env.REACT_APP_ADD_TESTIMONIALS,
            {
                coach_id: data.coach_id,
                user_id: data.user_id,
                testimonials:data.testimonials,
                rating:data.rating
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


