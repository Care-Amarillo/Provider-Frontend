import axios from "axios";

export const setToken = (stateObj) => {
    // TODO modify this action, so that it takes the onSubmit event handle object from Login,
    // perform the actual authentication, and then return as the "value" the actual retrieved token.
    return async (dispatch) => {

        let AUTHENTICATE_URL = "https://careamabrain.cmcoffee91.dev/users/authenticate";
        // let AUTHENTICATE_URL = "http://localhost:3000/users/authenticate";

        let newToken = null;


        let theUsername = stateObj.email;
        let thePassword = stateObj.password;
        console.log(`The given username is ${theUsername} and the given password is ${thePassword}.`);
        // Make a JSON object that will be passed to the backend API
        let credentials = {
            email: theUsername,
            password: thePassword
        }

        const response = await axios({
            method: 'post',
            url: AUTHENTICATE_URL,
            data: credentials
        });


        const data = await response.data;
        console.log("data " + JSON.stringify(data));
        const user = data.user;
        const token = data.token;
        console.log("user " + JSON.stringify(data.user));
        console.log("token " + JSON.stringify(data.token));

        const action = {
            type: "SET_TOKEN",
            value: token
        }
        dispatch(action);

        const userAction = {
            type: "SET_USER",
            value: user
        }
        dispatch(userAction);


    }   // end of that dispatch anonymous function
}

export const unsetToken = (tokenToRemove) => {
    return {
        type: "UNSET_TOKEN",
        value: tokenToRemove
    }
}


export const setUser = (user) => {
    return {
        type: "SET_USER",
        value: user
    }
}

export const unsetUser = (userToRemove) => {
    return {
        type: "UNSET_USER",
        value: userToRemove
    }
}



export const setProvider = (provider) => {
    return {
        type: "SET_PROVIDER",
        value: provider
    }
}

export const unsetProvider = (providerToRemove) => {
    return {
        type: "UNSET_PROVIDER",
        value: providerToRemove
    }
}