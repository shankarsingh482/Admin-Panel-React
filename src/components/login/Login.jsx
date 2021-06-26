
// Happy Liters Web Admin



import React, { useState } from 'react';
import { TextField, Button, Box } from '@material-ui/core/'
import Axios from 'axios'
import '../../styles/login.css';
import 'antd/dist/antd.css';
import { Helmet } from 'react-helmet'


export default function Login(props) {

  // const [PHONE, setPHONE] = useState('');
  const [EMAIL, setEMAIL] = useState('');
  const [PASSWORD, setPASSWORD] = useState('');
  const [PasswordError, setPasswordError] = useState('')
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState('')



  // function handleChangeOfPhone(e) {
  //   setPHONE(e.target.value);

  // }

  function handleChangeOfEmail(e) {
    setEMAIL(e.target.value);

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



  function submit(e) {
    e.preventDefault();
    Axios.post(process.env.REACT_APP_API_URL_USER+"login", {
      mobile_no: null,
      email: EMAIL,
      password: PASSWORD,
    }).then((response) => {
      if (response.data && response.data.RET_CODE === 200) {
        localStorage.setItem("token", response.data.jwttoken);
        window.location.href = "/";
      }
      if (response.data && response.data.RET_CODE === 201) {
        alert(response.data.message);
      }
    });
  }






  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>

      </Helmet>
      <div className='form'>
        <div className='form_logo'>
          Happy<span>L</span>ifters
          </div>
        <div className='form_title'>
          Log<span>I</span>n
          </div>
        <form className='form_items' noValidate onSubmit={submit}>
          <div className='form_inputs'>
            <TextField
              className='textfield'
              variant="filled"
              size='small'
              required
              error={false}
              fullWidth
              id="email"
              label="Email"
              name="EMAIL"
              value={EMAIL}
              onChange={handleChangeOfEmail}
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={PASSWORD}
              // onInput={validate}
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

          >
            Log In
            </Button>

        </form>
        <div className='form_other'>
          <a href='/forgot_password'>forgot password?</a>

        </div>


      </div>
    </React.Fragment>
  );
}

