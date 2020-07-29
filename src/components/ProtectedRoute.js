import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => checkAuth(rest.token)
                ? <Component {...props} />
                : <Redirect to="/login" />}
        />
    );
}

const checkAuth = (theJWT) => {
    if(theJWT != null) {
        return true;
    } else {
        return false;
    }
}

export default ProtectedRoute;