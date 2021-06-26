
import React, { useState } from 'react';
import { TextField, Button, Box } from '@material-ui/core/'
import '../../styles/login.css';
import 'antd/dist/antd.css';
import { Helmet } from 'react-helmet'
import { send_otp_api, forgot_password } from './Forgot_api'


export default function Forgot_password(props) {

    const [PHONE, setPHONE] = useState('');
    const [PASSWORD, setPASSWORD] = useState('');
    const [PasswordError, setPasswordError] = useState('')
    const [PasswordErrorMessage, setPasswordErrorMessage] = useState('')
    const [Secret, setSecret] = useState('');
    const [TypeOTP, setTypeOTP] = useState('');



    function handleChangeOfPhone(e) {
        setPHONE(e.target.value);

    }

    function handleChangeOfOTP(e) {
        setTypeOTP(e.target.value)
    }


    function handleChangeOfPassword(e) {
        setPASSWORD(e.target.value);
    }


    function validate(event) {

        var pass = event.target.value;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (strongRegex.test(pass)) {
            setPasswordError('green')
            setPasswordErrorMessage('Strong Password !')

        } else if (mediumRegex.test(pass)) {
            setPasswordError('orange')
            setPasswordErrorMessage('Your password is not strong !')
        } else {
            setPasswordError('red')
            setPasswordErrorMessage('Your password is not strong !')
        }
    }



    async function sendOtpFunction(e) {
        e.preventDefault();
        await send_otp_api(PHONE).then((res) => {

            if (res !== undefined && res.RET_CODE === 201) {
                setSecret(res.secret);
                alert(res.message);
            } else if (res.RET_CODE === 204) {
                alert(res.message);
            }
        });
    }

    async function submit(e) {
        e.preventDefault();
        const data = {
            mobile_no: PHONE,
            new_password: PASSWORD,
            secret: Secret,
            token: TypeOTP
        }

        await forgot_password(data).then((res) => {
            console.log(res)
            if (res !== undefined && res.RET_CODE === 200) {
                alert(res.message);
                window.location.href = "/login";
            } else {
                alert(res.message);
            }
        });



    }


    function display() {
        if (Secret) {
            return (
                <>
                    <div className='form_inputs'>
                        <TextField
                            className='textfield'
                            variant="filled"
                            size='small'
                            required
                            error={false}
                            fullWidth
                            type="number"
                            id="otp"
                            label="OTP"
                            name="OTP"
                            value={TypeOTP}
                            onChange={handleChangeOfOTP}
                        />
                    </div>

                    <div className='form_inputs'>
                        <TextField
                            variant="filled"
                            size='small'
                            error={false}
                            className='textfield'
                            required
                            fullWidth
                            inputProps={{ style: { color: PasswordError } }}
                            name="PASSWORD"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={PASSWORD}
                            onInput={validate}
                            onChange={handleChangeOfPassword}
                        />
                        <Box style={{ color: PasswordError, fontSize: 12 }}>
                            {PasswordErrorMessage}
                        </Box>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color='secondary'
                        className='form_button'
                        onClick={submit}
                    >
                        Set New Password
            </Button>
                </>)
        }
        else if (Secret === '') {
            return (<>
                <div className='form_inputs'>
                    <TextField
                        className='textfield'
                        variant="filled"
                        size='small'
                        required
                        error={false}
                        fullWidth
                        type="number"
                        id="phone"
                        label="Phone"
                        name="PHONE"
                        autoComplete="phone"
                        value={PHONE}
                        onChange={handleChangeOfPhone}
                    />
                </div>
                <Button
                    fullWidth
                    variant="contained"
                    color='secondary'
                    className='form_button'
                    onClick={sendOtpFunction}
                >
                    Send OTP
                </Button>
            </>)
        }

    }





    return (
        <React.Fragment>
            <Helmet>
                <title>Forgot Password</title>

            </Helmet>
            <div className='form'>
                <div className='form_logo'>
                    Happy<span>L</span>ifters
          </div>
                <div className='form_title'>
                    Forgot<span>Pass</span>word
          </div>
                <form className='form_items' noValidate onSubmit={submit}>




                    {display()}






                </form>
                <div className='form_other'>
                    <a href='/login'>Login</a>

                </div>


            </div>
        </React.Fragment>
    );
}

