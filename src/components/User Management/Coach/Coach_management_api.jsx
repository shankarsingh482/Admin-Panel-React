
import axios from "axios";



// Show Coach DropDown



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






// Show Coach Details


export function show_coach_details(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"show_coach_details",
            {
                coach_id: data
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



// Update Coach


export function update_coach(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"update_coach",
            {
                coach_id: data.coach_id,
                profile_image: data.profile_image,
                fname: data.fname,
                mname: data.mname,
                lname: data.lname,
                user_name: data.user_name,
                coach_name: data.coach_name,
                rating_avg: data.rating_avg,
                facebook_link: data.facebook_link,
                twitter_link: data.twitter_link,
                instagram_link: data.instagram_link,
                speacility: data.speacility,
                avilable_slot: data.avilable_slot,
                no_of_person_coached: data.no_of_person_coached,
                about_me: data.about_me,
                description: data.description,
                height: data.height,
                weight: data.weight,
                fat: data.fat,
                fitness_level: data.fitness_level,
                email: data.email,
                mobile: data.mobile,
                coach_type: data.coach_type,
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

export function show_coach_certificates(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"show_certificate",

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

export function add_coach_certificates(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"add_certificate",

            {
                coach_id: data.coach_id,
                certificate_name: data.certificate_name,
                certificate_image: data.certificate_image,
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

export function delete_coach_certificate(certificate_image, coach_id) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"delete_certificate",

            {
                coach_id: coach_id,
                toDeleteImage: certificate_image,
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

export function show_coach_clients(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"show_coach_clinet",

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

