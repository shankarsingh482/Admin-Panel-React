import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button'
import Divider from "@material-ui/core/Divider";
import Home from "@material-ui/icons/Home";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Apps from "@material-ui/icons/Apps";
import Clear from "@material-ui/icons/Clear";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Navigation from "@material-ui/icons/Navigation";
import RateReview from "@material-ui/icons/RateReview";
import EmojiPeople from "@material-ui/icons/EmojiPeople"
import Fastfood from "@material-ui/icons/Fastfood"
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import Dashboard from '../dashboard/Dashboard';
import {Link,Switch,BrowserRouter as Router, Route } from "react-router-dom";
import User_management from '../User Management/User_management';
import Payments from '../User Management/Payments/payments'
import Users from '../User Management/Users';
import Create_user from '../User Management/Create_user';
import Create_package from "../User Management/Package Management/Packages";
import Show_package from "../User Management/Package Management/Show_package";
import AssignPackage from '../User Management/Package Management/Assign_package'
import Package_management from "../User Management/Package Management/Package_management";
import CoachManagement from '../User Management/Coach/Coach_management';
import AddCoach from '../User Management/Coach/Add_coach';
import CoachCertificate from '../User Management/Coach/Coach_certificate';
import CoachClient from '../User Management/Coach/Coach_client';
import Coachpayments from '../User Management/Payments/CoachPayments';
import IngredientsManagement from "../User Management/Ingredients/Ingredients_management";
import CreateIngredients from "../User Management/Ingredients/Create_ingredients";
import {BackTop} from 'antd';
import ShowIngredients from "../User Management/Ingredients/Show_ingredients";
import Testimonials from "../User Management/Testimonials/Testimonials_management";
import List_of_assigned_packages from "../User Management/Package Management/List_of_assigned_packages";
import SupportManagement from '../User Management/Support/Support_management'
import ShowSupport from '../User Management/Support/Support'
import CloseSupport from '../User Management/Support/Close_supports'
import ShowMessage from '../User Management/Support/Show_message'
import ShowCloseMessage from '../User Management/Support/Show_close_message'
import WorkoutManagement from '../User Management/Workout/Workout_management'
import CreateWorkout from '../User Management/Workout/Create_workout'
import CouponManagement from '../User Management/Coupon Management/Coupon_management'

import Create_coupon from "../User Management/Coupon Management/Create_coupon";
import Show_coupon from "../User Management/Coupon Management/Show_coupon";
import AdditionalFunctionalities from '../User Management/Additional Functionalities/Additional_functionalities';
import Pop_up from '../User Management/Additional Functionalities/Pop_up';
import {Helmet} from 'react-helmet'
import Tooltip from '@material-ui/core/Tooltip';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';


import Notification from '../User Management/Additional Functionalities/Notification';
import AllPayments from "../User Management/Payments/AllPayments";

const drawerWidth = 248;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
        backgroundColor: "#111"
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    },
    avatar:
    {
        marginLeft:'auto',
    },
    menuButton: {
        marginRight: 36,
        // [theme.breakpoints.down("xs")]: {
        //     display: "none",
        //   },

    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        backgroundColor: "#111",
        color: "#ffffff"
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        backgroundColor: "#111",
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
            backgroundColor: "#111"
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
          },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1),
        }
    },
    link:
    {
        color:'inherit',
        textDecoration:'none',
    },
    container:
  {
    backgroundColor: '#c9d4cc',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    height: 'auto',
  },
  backtop:
  {
    height: 40,
    width: 40,
    // lineHeight: '40px',
    paddingTop:"7px",
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  }
}));


export default function Navbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    function logout_handle()
    {
        localStorage.removeItem('token');
        window.location.reload();
    }


    const toggle = () => {
        if (!open) {
            return (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open
                    })}
                >
                    <Apps />
                </IconButton>
            );
        } else {
            return (
                <div className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerClose}
                        aria-label="close drawer"
                        edge="start"
                    >
                        <Clear />
                    </IconButton>
                </div>
            );
        }
    };


    return (
        <div className={classes.root}>
        <Helmet>
            <title>Happy Lifters</title>

        </Helmet>
        <Router>

            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {toggle()}
                    <Typography variant="h6" noWrap style={{color:'white'}}>
                       Happy Lifters

          </Typography>
          <div className={classes.avatar}>
          <img src="LogoWhite.png" alt="Logo" width="47px" style={{paddingRight:"16px"}}/>
          </div>
          <Button onClick={logout_handle}>
          <a href='/login'>Logout</a>
          </Button>


                </Toolbar>

            </AppBar>
            <SwipeableDrawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button>

                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/' className={classes.link}>
                            <Tooltip title="Home">
                                <Home />
                            </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/' className={classes.link}>
                        <ListItemText primary={"Home"} />
                        </Link>
                    </ListItem>


                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/user_management' className={classes.link}>
                            <Tooltip title="Users Management">
                                <PeopleAlt />
                            </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/user_management' className={classes.link}>
                            <ListItemText primary={"Users Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/package_management' className={classes.link}>
                        <Tooltip title="Package Management">
                            <AssignmentInd />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/package_management' className={classes.link}>
                            <ListItemText primary={"Package Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/coach_management' className={classes.link}>
                        <Tooltip title="Coach Management">
                            <EmojiPeople/>
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/coach_management' className={classes.link}>
                            <ListItemText primary={"Coach Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/ingredients_management' className={classes.link}>
                            <Tooltip title="Ingredient Management">
                                <Fastfood />
                            </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/ingredients_management' className={classes.link}>
                            <ListItemText primary={"Ingredient Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/testimonials' className={classes.link}>
                        <Tooltip title="Testimonials">
                            <RateReview />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/testimonials' className={classes.link}>
                            <ListItemText primary={"Testimonials"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/support_management' className={classes.link}>
                        <Tooltip title="Support">
                            <LiveHelpIcon />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/support_management' className={classes.link}>
                            <ListItemText primary={"Support Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/workout_management' className={classes.link}>
                        <Tooltip title="Workout Management">
                            <FitnessCenterIcon />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/workout_management' className={classes.link}>
                            <ListItemText primary={"Workout Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/coupon_management' className={classes.link}>
                        <Tooltip title="Coupon Management">
                            <LoyaltyIcon />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/coupon_management' className={classes.link}>
                            <ListItemText primary={"Coupon Management"} />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon style={{ color: "#f2f7f4" }}>
                        <Link to='/additional_functionalities' className={classes.link}>
                        <Tooltip title="Additional Functionalities">
                            <PlaylistAddIcon />
                        </Tooltip>
                        </Link>
                        </ListItemIcon>
                        <Link to='/additional_functionalities' className={classes.link}>
                            <ListItemText primary={"Additional Functionalities"} />
                        </Link>
                    </ListItem>

                </List>
                <Divider style={{ backgroundColor: "#4b4e54" }} />
            </SwipeableDrawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Container className={classes.container} maxWidth={false}>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route exact path='/user_management' component={User_management}/>
                    <Route exact path='/users' component={Users}/>
                    <Route exact path='/create_user' component={Create_user}/>
                    <Route exact path='/create_package' component={Create_package}/>
                    <Route exact path='/show_package' component={Show_package}/>
                    <Route exact path='/assign_package' component={AssignPackage}/>
                    <Route exact path='/package_management' component={Package_management}/>
                    <Route exact path='/add_coach_details' component={AddCoach}/>
                    <Route exact path='/coach_certificates' component={CoachCertificate}/>
                    <Route exact path='/coach_clients' component={CoachClient}/>
                    <Route exact path='/coach_management' component={CoachManagement}/>
                    <Route exact path='/ingredients_management' component={IngredientsManagement}/>
                    <Route exact path='/create_ingredients' component={CreateIngredients}/>
                    <Route exact path='/show_ingredients' component={ShowIngredients}/>
                    <Route exact path='/testimonials' component={Testimonials}/>
                    <Route exact path='/list_of_assigned_packages' component={List_of_assigned_packages}/>
                    <Route exact path='/support_management' component={SupportManagement}/>
                    <Route exact path='/open_supports' component={ShowSupport}/>
                    <Route exact path='/close_supports' component={CloseSupport}/>
                    <Route exact path='/messages' component={ShowMessage}/>
                    <Route exact path='/close_messages' component={ShowCloseMessage}/>
                    <Route exact path='/workout_management' component={WorkoutManagement}/>
                    <Route exact path='/create_workout' component={CreateWorkout}/>
                    <Route exact path='/coupon_management' component={CouponManagement}/>
                    <Route exact path ="/payments" component ={Payments}/>
                    <Route exact path='/all_payments' component={AllPayments}/>
                    <Route exact path="/coach_Payments" component ={Coachpayments} />
                    <Route exact path='/create_coupon' component={Create_coupon}/>
                    <Route exact path='/show_coupon' component={Show_coupon}/>
                    <Route exact path='/additional_functionalities' component={AdditionalFunctionalities}/>
                    <Route exact path='/pop_up_window' component={Pop_up}/>
                    <Route exact path='/notifications' component={Notification}/>

                </Switch>
                </Container>
                <BackTop>
                                <div className={classes.backtop}><Navigation/></div>
                            </BackTop>

            </main>
            </Router>
        </div>
    );
}

