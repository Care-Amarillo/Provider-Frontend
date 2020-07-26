import { combineReducers } from 'redux'

const user = (state = null, action) => {
    switch(action.type) {
        case "SET_USER":
            return action.value;    // action.value should be the new user
        case "UNSET_USER":
            return null;
        default:
            return state;
    }
}

const provider = (state = null, action) => {
    switch(action.type) {
        case "SET_PROVIDER":
            return action.value;
        case "UNSET_PROVIDER":
            return null;
        default:
            return state;
    }
}


const mobileOpen = (state = null, action) => {
    switch(action.type) {
        case "SET_OPEN":
            return action.value;
        case "UNSET_OPEN":
            return null;
        default:
            return state;
    }
}


const swRegistration = (state = null, action) => {
    switch (action.type) {
        case "SET_SWREGISTRATION":
            return action.value;
        case "UNSET_SWREGISTRATION":
            return null;
        default:
            return state;
    }
}

const token = (state = null, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return action.value;
        case "UNSET_TOKEN":
            return null;
        default:
            return state;
    }
}

export default combineReducers({ user, token, provider, mobileOpen, swRegistration })