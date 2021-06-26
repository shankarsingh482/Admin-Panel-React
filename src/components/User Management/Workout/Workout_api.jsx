

import axios from "axios";


// Show Workout type API



export function show_workout_type_api() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_MASTER+"show_free_paid_drop",
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





// Show Close Support API



export function show_close_support_api() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_ADMIN+"show_close_support",
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





// show message


export function show_message_api(id) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"show_message",
            {
                support_id: id
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




// close support api

export function close_support_api(id) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"close_support",
            {
                support_id: id
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




// send message


export function send_message_api(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"send_message",
            {
                support_id: data.support_id,
                message: data.message
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