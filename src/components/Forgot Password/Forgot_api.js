// Send OTP

import axios from "axios";

export const send_otp_api = (user) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_USER+"send_otp",
            {
                mobile_no: user
            },
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};


// send forgot OTP and Secret Key ( Forgot Password )


export const forgot_password = (user) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL_USER+"forget_password",
            {
                mobile_no: user.mobile_no,
                new_password: user.new_password,
                secret: user.secret,
                token: user.token
            },
        )
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};
