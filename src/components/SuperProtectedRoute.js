import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const SuperProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => checkAuth(rest.token, rest.user)
                ? <Component {...props} />
                : <Redirect to="/login" />}
        />
    );
}

const checkAuth = (theJWT, user) => {
    if(user){
        console.log("user super protected: " + JSON.stringify(user));
    }
    if(theJWT != null && user && user.superAdmin) {
        return true;
    } else {
        return false;
    }
}

export default SuperProtectedRoute;