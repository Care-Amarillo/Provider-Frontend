import React from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ProviderDetail from "../../containers/ProviderDetail";
import Login from "../../containers/Login";
import ProtectedRoute from "../../containers/ProtectedRoute";
import Register from "../../containers/Register";
import ProviderPanel from "../../containers/ProviderPanel";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles} from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import store from '../../redux/store';
import ProviderEntries from "../../containers/ProviderEntries";
import AuditEntries from "../../containers/AuditEntries";
import ProviderRegister from "../../containers/ProviderRegister";
import CareAppNav from "../../containers/CareAppNav";
import EditProvider from "../../containers/EditProvider";
import EditUser from "../../containers/EditUser";
import SuperProtectedRoute from "../../containers/SuperProtectedRoute";
import SuperAdminProviders from "../../containers/SuperAdminProviders";
import SuperAdminEditProvider from "../../containers/SuperAdminEditProvider";
import SuperAdminProviderEntries from "../../containers/SuperAdminProviderEntries";
import SuperAdminSendPush from "../../containers/SuperAdminSendPush";
import SuperAdminUsers from "../../containers/SuperAdminUsers";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    }
}));

function ResponsiveDrawer(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <CssBaseline />
            <Provider store={store}>
                <BrowserRouter>
                    <CareAppNav/>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/" component={ProviderPanel} />
                            <SuperProtectedRoute exact path="/audit" component={AuditEntries} />
                            <SuperProtectedRoute exact path="/superAdminProviders" component={SuperAdminProviders} />
                            <SuperProtectedRoute exact path="/superAdminProviderEntry" component={SuperAdminProviderEntries} />
                            <SuperProtectedRoute exact path="/superAdminSendPush" component={SuperAdminSendPush} />
                            <SuperProtectedRoute exact path="/superAdminUsers" component={SuperAdminUsers} />
                            <SuperProtectedRoute exact path="/superAdminEditProvider/:id" component={SuperAdminEditProvider} />
                            <ProtectedRoute exact path="/providerSignUp" component={ProviderRegister} />
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