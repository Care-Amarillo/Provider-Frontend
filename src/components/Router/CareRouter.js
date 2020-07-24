import React from 'react'
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import ProviderDetail from "../ProviderDetail/ProviderDetail";
import Login from "../../containers/Login";
import ProtectedRoute from "../../containers/ProtectedRoute";
import Register from "../../containers/Register";
import CareBottomNav from "../CareBottomNav/CareBottomNav";
import ProviderPanel from "../../containers/ProviderPanel";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ProviderEntries from "../ProviderEntries/ProviderEntries";
import AuditEntries from "../AuditEntries/AuditEntries";
import ProviderRegister from "../../containers/ProviderRegister";
import CareAppNav from "../CareAppBar/CareAppNav";

//todo: figure out a way to separate responsive drawer

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

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (

        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem key="login" component={Link} to={"/login"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>

                <ListItem key="register" component={Link} to={"/register"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Register" />
                </ListItem>

                <ListItem key="audit" component={Link} to={"/audit"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Audit" />
                </ListItem>


                <ListItem key="provider" component={Link} to={"/provider"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Provider" />
                </ListItem>

                <ListItem key="providerEntries" component={Link} to={"/providerEntry"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Provider Entries" />
                </ListItem>


                <ListItem key="providerSignUp" component={Link} to={"/providerSignUp"  }>
                    <ListItemIcon>
                        <AccountCircleIcon/>

                    </ListItemIcon>
                    <ListItemText primary="Create Provider" />
                </ListItem>

            </List>
        </div>
    );

    // todo: maybe change to functional component
    const appBar = (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                   Care Amarillo
                </Typography>
            </Toolbar>
        </AppBar>
    );


    // todo: maybe change to functional component
    const nav = (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );

    return (
        <div className={classes.root}>

            <CssBaseline />
            {appBar}
            <Provider store={store}>
                <BrowserRouter>
                    {/*{nav}*/}
                    <CareAppNav/>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/" component={ProviderPanel} />
                            <ProtectedRoute exact path="/providerSignUp" component={ProviderRegister} />
                            <ProtectedRoute exact path="/audit" component={AuditEntries} />
                            <ProtectedRoute exact path="/providerEntry" component={ProviderEntries} />
                            <ProtectedRoute exact path="/editProvider" component={EditProvider} />
                            <Route exact path="/provider" component={ProviderPanel} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/providerDtl/:id" component={ProviderDetail} />
                        </Switch>
                    </main>
                </BrowserRouter>
            </Provider>
        </div>
    );
}


const CareRouter = () => {
    return (
        <ResponsiveDrawer/>
    )
}

export default CareRouter