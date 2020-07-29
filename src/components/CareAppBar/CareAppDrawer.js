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
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';


const drawerWidth = 250;

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
    logo:{
        width:"70px",
        height:"50px",
        margin: "auto",
        [theme.breakpoints.down('md')]: {
            width:"50px",
            height:"30px",
        },
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
    }
}));

const LoginListItem = (props) => {
    return <ListItem key="login" onClick={()=>props.handleClick()} component={Link} to={"/login"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        <Button startIcon={<AccountCircleIcon/>}>Login</Button>
        {/*<ListItemText primary="Login"/>*/}
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
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*/!*<ListItemText primary="Audit"/>*!/*/}
        <Button startIcon={<TableChartIcon/>}>Audit Entries</Button>
    </ListItem>;
}

const ProviderListItem = (props) => {



    return <ListItem key="provider"  onClick={()=>props.handleClick()} component={Link} to={"/provider"}>
        {/*<ListItemIcon>*/}
        {/*    /!*<Home/>*!/*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Provider"/>*/}
        <Button startIcon={<Home/>}>Providers</Button>
    </ListItem>;
}


const ProviderEntryListItem = (props) => {

    return <ListItem key="providerEntries" onClick={()=>props.handleClick()} component={Link} to={"/providerEntry"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Provider Entries"/>*/}
        <Button startIcon={<TableChartIcon/>}>Provider Entries</Button>
    </ListItem>;
}

const SuperAdminProviderEntryListItem = (props) => {

    return <ListItem key="superAdminProviderEntries" onClick={()=>props.handleClick()} component={Link} to={"/superAdminProviderEntry"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Provider Entries"/>*/}
        <Button startIcon={<TableChartIcon/>}>Provider Entries</Button>
    </ListItem>;
}

const ProviderSignUpListItem = (props) => {
    return <ListItem key="providerSignUp" onClick={()=>props.handleClick()} component={Link} to={"/providerSignUp"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Create Provider"/>*/}
        <Button startIcon={<AddIcon/>}>Create Provider</Button>
    </ListItem>;
}


const EditProviderListItem = (props) => {
    return <ListItem key="editProvider" onClick={()=>props.handleClick()} component={Link} to={"/editProvider"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Manage Provider"/>*/}
        <Button startIcon={<EditIcon/>}>Manage Provider</Button>
    </ListItem>;
}


const SuperAdminEditUsersListItem = (props) => {
    return <ListItem key="editAllUsers" onClick={()=>props.handleClick()} component={Link} to={"/superAdminUsers"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Manage Provider"/>*/}
        <Button startIcon={<EditIcon/>}>Manage All Users</Button>
    </ListItem>;
}



const UserListItem = (props) => {

    return <ListItem key="Profile" onClick={()=>props.handleClick()} component={Link} to={"/editUser"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Profile"/>*/}
        <Button startIcon={<AccountCircleIcon/>}>Profile</Button>
    </ListItem>;
}

const SuperAdminProvidersListItem = (props) => {

    return <ListItem key="superAdminProviders" onClick={()=>props.handleClick()} component={Link} to={"/superAdminProviders"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Manage Providers"/>*/}
        <Button startIcon={<EditIcon/>}>Manage Providers</Button>
    </ListItem>;
}


const SuperAdminSendPushListItem = (props) => {

    return <ListItem key="superAdminSendPush" onClick={()=>props.handleClick()} component={Link} to={"/superAdminSendPush"}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}

        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Manage Providers"/>*/}
        <Button startIcon={<SendIcon/>}>Send Push</Button>
    </ListItem>;
}



const LogOutListItem = (props) => {
    const handleClick = () =>{
        props.drawerProps.unsetToken(props.drawerProps.token);
        props.drawerProps.unsetUser(props.drawerProps.user);
        props.handleClick();
    }
    return <ListItem key="logOut" onClick={()=>handleClick()}>
        {/*<ListItemIcon>*/}
        {/*    <AccountCircleIcon/>*/}
        {/*</ListItemIcon>*/}
        {/*<ListItemText primary="Log Out"/>*/}
        <Button startIcon={<ExitToAppIcon/>}>Log Out</Button>
    </ListItem>;
}




const CareAppDrawer = (props) => {
    const classes = useStyles();
    const listOfListItems = [];

    const handleClick = () =>{
        props.setOpen(false);
    }


    //todo: check active status of user and providers

    listOfListItems.push(<ProviderListItem handleClick={handleClick}/>);
    // listOfListItems.push(<RegisterListItem/>);

    //if user is there and is NOT an admin, add to the list
    if (props.token && props.user && !props.user.admin && !props.user.superAdmin) {
        listOfListItems.push(<ProviderSignUpListItem handleClick={handleClick}/>);
    }

    //if user is there and is an admin, add to the list
    //user will only have provider if they are an admin
    if (props.token && props.user && props.user.admin) {
        listOfListItems.push(<EditProviderListItem handleClick={handleClick}/>);
        listOfListItems.push(<ProviderEntryListItem handleClick={handleClick}/>);
    }

    if (props.token && props.user && props.user.superAdmin) {
        listOfListItems.push(<AuditListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminProvidersListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminProviderEntryListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminSendPushListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminEditUsersListItem handleClick={handleClick}/>);
    }

    if (props.token) {
        listOfListItems.push(<UserListItem handleClick={handleClick}/>);
        listOfListItems.push(<LogOutListItem handleClick={handleClick} drawerProps={props}/>);
    } else {
        listOfListItems.push(<LoginListItem handleClick={handleClick}/>);
    }





    return (
        <div>
            <div className={classes.toolbar}/>
            {/*<img className={classes.logo}  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiGh1xwMqN286EqsRuHP0xoy6e6IEsIN_T_g&usqp=CAU'} alt="cityOfAmarillo" />*/}

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