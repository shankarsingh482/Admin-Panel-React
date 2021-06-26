
// Create Package API

import axios from "axios";


export const create_package = (data) => {
    return axios
        .post(
            "http://13.126.55.56:3000/master/add_package",
            {
                packages_name: data.package_name,
                packages_for: data.package_for,
                description: data.description,
                duration: data.duration,
                session: data.session,
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






// Show Package



export function show_package() {
    return axios
        .get(
            process.env.REACT_APP_API_URL_MASTER+"show_package",
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





// Show Coach



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








// Assign Packages


export const assign_packages = (data) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"assign_packages",
            {
                coach_id: data.coach_id,
                package_ids: data.package_ids
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




// Show Package For Coach


export function show_package_for_coach(data) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_USER+"show_package",
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

export function delete_packege(package_id) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"delete_package",
            
            {
                package_id: package_id,
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

export function delete_coach_packege(package_id, coach_id) {
    return axios
        .post(
            process.env.REACT_APP_API_URL_ADMIN+"remove_package",
            
            {
                coach_id: coach_id,
                package_id: package_id,
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