import axios from "axios";

// Upload pop-up banner

export const upload_popup = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"add_popup_image",
            {
                popup_image: data.popup_image,
                popup_link: data.popup_link,
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

// Fetch pop-up banner image and status of pop-up window 

export function show_popup() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_ADMIN+"show_popup_image",
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

//Make banner active or inactive. 
//Alternate switch button function

export const make_popup_live = (active) => {
    let popup="";
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"make_popup_live",
            {
                active: active,
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