import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ContactMail from "@material-ui/icons/ContactMail";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { create_coupon } from "./Coupon_management_api";
import { Helmet } from "react-helmet";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  container: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
}));

export default function Create_coupon(props) {
  const classes = useStyles();

  // useState Hooks
  const [COUPON_TYPE, setCOUPON_TYPE] = useState("");

  const [COUPON_CODE, setCOUPON_CODE] = useState("");
  // const [SHORT_NAME, setSHORT_NAME] = useState('')
  const [USE_LIMIT, setUSE_LIMIT] = useState("");
  const [COUPON_DISCOUNT, setCOUPON_DISCOUNT] = useState("");
  const [EXPIRY_DATE, setEXPIRY_DATE] = useState("");

  // function for handle changes
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChanges = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // function for handle changes for Coupon Code

  function handleChangeOfCouponCode(e) {
    setCOUPON_CODE(e.target.value);
  }

  // function for handle changes for Short Name
  const [state, setState] = React.useState({
    age: 1,
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  // function handleChangeOfShortName(e) {
  //     setSHORT_NAME(e.target.value)

  // }

  // function for handle changes for Use Limit

  function handleChangeOfUseLimit(e) {
    setUSE_LIMIT(e.target.value);
  }

  // function for handle changes for Coupon Discount

  function handleChangeOfCouponDiscount(e) {
    setCOUPON_DISCOUNT(e.target.value);
  }
  // function for handle changes for coupon type

  const handleChangeOfCouponType = (event) => {
    setCOUPON_TYPE(event.target.value);
  };


  console.log(state.age);

  // function for handle changes for Expiry Date

  let showField;
  if(state.age == 1){
    showField = <TextValidator
    variant="outlined"
    required
    fullWidth 
    type="number"
    id="coupon_discount_id"
    label="Coupon Discount (in ₹)"
    name="COUPON_DISCOUNT"
    autoComplete="coupondiscountid"
    value={COUPON_DISCOUNT}
    validators={["required"]}
    errorMessages={["this field is required"]}
    onChange={handleChangeOfCouponDiscount}
  />
  }
  
  else if (state.age == 0) {
    showField = (
      <TextValidator
        variant="outlined"
        required
        fullWidth
        type="number"
        id="coupon_discount_id"
        label="Coupon Discount (in %)"
        name="COUPON_DISCOUNT"
        autoComplete="coupondiscountid"
        value={COUPON_DISCOUNT}
        validators={["required"]}
        errorMessages={["this field is required"]}
        onChange={handleChangeOfCouponDiscount}
      />
    );
  }

  function handleChangeOfExpiryDate(e) {
    setEXPIRY_DATE(e.target.value);
  }

  // function for handle Submit

  function submit(e) {
    //console.log(COUPON_CODE+ " "+ SHORT_NAME +" "+ USE_LIMIT +" "+ EXPIRY_DATE);
    const data = {
      discount_type: state.age,
      discount_name: COUPON_CODE,
      time_use: USE_LIMIT,
      discount_amount: COUPON_DISCOUNT,
      expiry_date: EXPIRY_DATE,
    };
    e.preventDefault();
    create_coupon(data).then((res) => {
      //discount type={0,1}
      //1-amount coupon
      //0-percentage coupon
      if (res.data !== undefined && res.data.RET_CODE === 200) {
        alert("Coupon created successfully.");
        window.location.reload();
      } else {
        // alert(`${res.data.message}`);
        alert("Coupon code already exist");
      }
    });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Create Coupon</title>
      </Helmet>
      <Container component="main" maxWidth="sm" className={classes.container}>
        <CssBaseline />
        <Paper elevation={3} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ContactMail />
          </Avatar>
          <Typography component="h1" variant="h5">
              Create Coupon
          </Typography>
          <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  style={{ width: "100%", marginBottom: "1rem" }}
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Coupon Type
                  </InputLabel>
                  <Select
                    
                    native
                    value={state.age}
                    onChange={handleChange}
                    label="Coupon Type"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    {/* <option aria-label="None" value="" /> */}
                    <option value={1}>Amount Type</option>
                    <option value={0}>Percentage Type</option>
                  </Select>
                </FormControl>

                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  id="coupon_code_id"
                  label="Coupon Code"
                  name="COUPON_CODE"
                  autoComplete="couponcodeid"
                  value={COUPON_CODE}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={handleChangeOfCouponCode}
                ></TextValidator>
              </Grid>

              {/* <Grid item xs={12}>
                                <TextValidator
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="short_name_id"
                                    label="Short Name"
                                    name="SHORT_NAME"
                                    autoComplete="shortnameid"
                                    value={SHORT_NAME}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    onChange={handleChangeOfShortName}
                                />
                            </Grid> */}

              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="use_limit_id"
                  label="Use Limit"
                  name="USE_LIMIT"
                  autoComplete="uselimitid"
                  value={USE_LIMIT}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={handleChangeOfUseLimit}
                />
              </Grid>

              <Grid item xs={12}>
                {
                  
                    showField
                  
                  /* <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="coupon_discount_id"
                  label="Coupon Discount (in ₹)"
                  name="COUPON_DISCOUNT"
                  autoComplete="coupondiscountid"
                  value={COUPON_DISCOUNT}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={handleChangeOfCouponDiscount}
                /> */
                }
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  type="date"
                  id="expiry_date_id"
                  label="Expiry Date"
                  name="EXPIRY_DATE"
                  autoComplete="expirydateid"
                  value={EXPIRY_DATE}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  onChange={handleChangeOfExpiryDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onSubmit={submit}
              submitButtonText="Submit"
              className={classes.submit}
            >
              Create Coupon
            </Button>
          </ValidatorForm>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
