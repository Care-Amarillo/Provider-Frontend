import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
    }
}));

const LoginListItem = (props) => {
    return <ListItem key="login" onClick={()=>props.handleClick()} component={Link} to={"/login"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Login"/>
    </ListItem>;
}


const RegisterListItem = (props) => {
    return <ListItem key="register" onClick={()=>props.handleClick()} component={Link} to={"/register"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Register"/>
    </ListItem>;
}

const AuditListItem = (props) => {
    return <ListItem key="audit" onClick={()=>props.handleClick()} component={Link} to={"/audit"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Audit"/>
    </ListItem>;
}

const ProviderListItem = (props) => {



    return <ListItem key="provider"  onClick={()=>props.handleClick()} component={Link} to={"/provider"}>
        <ListItemIcon>
            <Home/>

        </ListItemIcon>
        <ListItemText primary="Provider"/>
    </ListItem>;
}


const ProviderEntryListItem = (props) => {

    return <ListItem key="providerEntries" onClick={()=>props.handleClick()} component={Link} to={"/providerEntry"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Provider Entries"/>
    </ListItem>;
}

const ProviderSignUpListItem = (props) => {
    return <ListItem key="providerSignUp" onClick={()=>props.handleClick()} component={Link} to={"/providerSignUp"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Create Provider"/>
    </ListItem>;
}


const EditProviderListItem = (props) => {
    return <ListItem key="editProvider" onClick={()=>props.handleClick()} component={Link} to={"/editProvider"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Edit Provider"/>
    </ListItem>;
}



const UserListItem = (props) => {

    return <ListItem key="Profile" onClick={()=>props.handleClick()} component={Link} to={"/editUser"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Profile"/>
    </ListItem>;
}

const SuperAdminProvidersListItem = (props) => {

    return <ListItem key="superAdminProviders" onClick={()=>props.handleClick()} component={Link} to={"/superAdminProviders"}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Manage Providers"/>
    </ListItem>;
}



const LogOutListItem = (props) => {
    const handleClick = () =>{
        props.drawerProps.unsetToken(props.drawerProps.token);
        props.drawerProps.unsetUser(props.drawerProps.user);
        props.handleClick();
    }
    return <ListItem key="logOut" onClick={()=>handleClick()}>
        <ListItemIcon>
            <AccountCircleIcon/>

        </ListItemIcon>
        <ListItemText primary="Log Out"/>
    </ListItem>;
}




const CareAppDrawer = (props) => {
    const classes = useStyles();
    const listOfListItems = [];

    const handleClick = () =>{
        console.log("handleclick");
        props.setOpen(false);
    }

    console.log("props.token appDrawer: " + props.token);
    console.log("props.user appDrawer: " + JSON.stringify(props.user));

    //todo: check active status of user and providers

    listOfListItems.push(<ProviderListItem handleClick={handleClick}/>);
    // listOfListItems.push(<RegisterListItem/>);

    //if user is there and is NOT an admin, add to the list
    if (props.token && props.user && !props.user.admin) {
        listOfListItems.push(<ProviderSignUpListItem handleClick={handleClick}/>);
    }

    //if user is there and is an admin, add to the list
    //user will only have provider if they are an admin
    if (props.token && props.user && props.user.admin) {
        listOfListItems.push(<EditProviderListItem handleClick={handleClick}/>);
    }

    if (props.token && props.user && props.user.superAdmin) {
        listOfListItems.push(<AuditListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminProvidersListItem handleClick={handleClick}/>);
    }

    if (props.token) {
        listOfListItems.push(<ProviderEntryListItem handleClick={handleClick}/>);
        listOfListItems.push(<UserListItem handleClick={handleClick}/>);
        listOfListItems.push(<LogOutListItem handleClick={handleClick} drawerProps={props}/>);
    } else {
        listOfListItems.push(<LoginListItem handleClick={handleClick}/>);
    }





    return (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {
                    listOfListItems.map((data, index) => (
                        data
                    ))
                }
            </List>
        </div>
    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppDrawer