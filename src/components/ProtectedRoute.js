import React from 'react';
import { Redirect, Route } from 'react-router-dom';

/// NOTE the ... operator is called the spread operator.  It expands the given object into individual parameters
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => checkAuth(rest.token)  // if checkAuth() returns true, render the passed in Component, else render the Redirect
                ? <Component {...props} />
                : <Redirect to="/login" />}
        />
    );
}

const checkAuth = (theJWT) => {
    console.log(theJWT);
    if(theJWT != null) {
        return true;
    } else {
        return false;
    }
    // returns true or false, based on successful authentication.
    // In this example, a successful authentication would be that state.JWT has an actual token.
    // For testing just for now, just return a bool
    //return false;
}

export default ProtectedRoute;