import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ProviderDetail from "../ProviderDetail/ProviderDetail";
import Login from "../../containers/Login";
import ProtectedRoute from "../../containers/ProtectedRoute";
import Register from "../../containers/Register";
import ProviderPanel from "../../containers/ProviderPanel";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
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
import EditProvider from "../../containers/EditProvider";
import EditUser from "../../containers/EditUser";

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



    return (
        <div className={classes.root}>

            <CssBaseline />
            {appBar}
            <Provider store={store}>
                <BrowserRouter>
                    <CareAppNav/>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/" component={ProviderPanel} />
                            <ProtectedRoute exact path="/providerSignUp" component={ProviderRegister} />
                            <ProtectedRoute exact path="/audit" component={AuditEntries} />
                            <ProtectedRoute exact path="/providerEntry" component={ProviderEntries} />
                            <ProtectedRoute exact path="/editProvider" component={EditProvider} />
                            <ProtectedRoute exact path="/editUser" component={EditUser} />
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