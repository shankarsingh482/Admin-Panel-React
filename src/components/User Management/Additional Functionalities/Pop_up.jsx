
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Divider, Paper, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import Button from "@material-ui/core/Button";
import FileBase64 from 'react-file-base64';
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {Container, TextField} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import { upload_popup, show_popup, make_popup_live } from './Additional_functionalitiesAPI';

export default function Pop_up(props) {
    //const [data, setData] = useState([]);
    const [PopUpImage, setPopUpImage] = useState([]);
    const [check, setCheck] = useState(false);
    const [BANNER_IMAGE, setBANNER_IMAGE] = useState('');
    const [LINK_TO, setLINK_TO] = useState('');
    const [ShowBANNER_IMAGE, setShowBANNER_IMAGE] = useState('');
    const [CorrectBANNER_IMAGE, setCorrectBANNER_IMAGE] = useState(false);
    //const [Active, setActive] = useState(false);
    const getData = () => {
      
    }

    const showPopupImage = () => {


      show_popup().then((res) => {
            if (res !== undefined && res.RET_CODE === 200) {
              setShowBANNER_IMAGE(res.data[0].image);
              if(res.data[0].active == 0){
                setCheck(false)
              }
              else{
                setCheck(true)
              }
            }
            if (res.RET_CODE === 201) {
                alert(res.message)
            }
        });

    }
    useEffect(() => {
      showPopupImage();
    }, [setPopUpImage]); 

    const useStyles = makeStyles((theme) => ({
      center: {
        marginLeft: "auto",
        marginRight: "auto"
      },
      container:
      {
          marginTop: theme.spacing(2),
          backgroundColor: "#ffffff",
          padding: theme.spacing(3),
          [theme.breakpoints.down("md")]: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
          }
      },
      large:
      {
        margin: theme.spacing(3),
        height: "320px",
      },
      switch: 
      {
        marginTop: theme.spacing(2),
        marginLeft: "37%",
        [theme.breakpoints.down("xs")]: {
          marginLeft: "18%",
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "24%",
        },
        [theme.breakpoints.down("md")]: {
          marginLeft: "34%",
        }
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 48,
      height: 25,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 3,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(22px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#52d869',
          borderColor: '#52d869',
        },
      },
    },
    thumb: {
      width: 19,
      height: 19,
      boxShadow: 'none',
    },
    track: {
      // border: `1px solid`,
      borderRadius: 48 / 2,
      opacity: 1,
      backgroundColor: '#de0b0b',
    },
    checked: {},
  }))(Switch);

  function getBannerImage(files) {
    var okay= true
    if (!files.name.match(/\.(jpg|jpeg|png)$/)){
        okay=false
        setCorrectBANNER_IMAGE(false)
        alert("Please select an image file")
    }
    if(okay){
        setBANNER_IMAGE(files.base64.split(',')[1]);
        if(BANNER_IMAGE!== null){
            setCorrectBANNER_IMAGE(true)
            //console.log(BANNER_IMAGE)
        }
        else{
            setCorrectBANNER_IMAGE(false)
        }
    }
}

  function upload(e){
      //console.log(LINK_TO)
      const data = {
        popup_image: BANNER_IMAGE,
        popup_link: LINK_TO,
      };
      e.preventDefault();
      console.log(CorrectBANNER_IMAGE);
      if(CorrectBANNER_IMAGE){
      upload_popup(data).then((res) => {

          if (res.data !== undefined && res.data.RET_CODE === 200) {
              alert(`${res.data.message}`);
              window.location.reload();
          } 
          else {
              // alert(`${res.data.message}`);
              alert("There is some problem");
          }
      });
    }
      else{
        alert("There is some problem");
      }
  }

  function handleChangeOfLinkTo(e){
    setLINK_TO(e.target.value);
    console.log(LINK_TO)
  }

  function handleChange(){
    var active=1;
    //console.log(check);
    if(check==true){
      setCheck(false);
      active=0;
    }
    else{
      setCheck(true);
      active=1;
    }
    make_popup_live(active).then((res) => {
      //console.log(res);
      if (res.data !== undefined && res.data.RET_CODE === 200) {
          alert(`${res.data.message}`);
          window.location.reload();
      } 
      else {
          // alert(`${res.data.message}`);
          alert("There is some problem");
      }
  });
  }

    return (
      
      <React.Fragment>
      <Helmet>
        <title>Pop Up Image</title>
      </Helmet>
      <Container component="main" maxWidth="md" className={classes.container}>
      
      <Grid item lg={9} xs={12} align="center" className={classes.center} >
      <Typography component="h1" variant="h6">
          Pop-up Window
      </Typography>
          <Paper variant="outlined">
            <img  className={classes.large} src={ShowBANNER_IMAGE}/>
          </Paper>
          <FileBase64 multiple={false} onDone={getBannerImage} />
            <Typography style={{fontSize:'11px', color: '#757575', marginLeft: '8px'}}>**Upload image files (jpg/jpeg/png) only</Typography>
            <br></br>
            <Grid item xs={12} md={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="linkTo"
                    label="Link to"
                    placeholder=""
                    value={LINK_TO}
                    errorMessages={['this field is required', 'email is not valid']}
                    
                    onInput={handleChangeOfLinkTo}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={upload}
                className={classes.submit}
            >
                Upload Pop-up Banner
            </Button>
            <Grid item xs={12} align="center" className={classes.switch}>
              <Grid component="label" container alignItems="center" spacing={2}>
                <Grid item>Inactive</Grid>
                <Grid item>
                  <AntSwitch checked={check} onChange={handleChange} name="check" />
                </Grid>
                <Grid item>Active</Grid>
              </Grid>
            </Grid>
      </Grid>
      
      </Container>
    </React.Fragment>
    )
}

