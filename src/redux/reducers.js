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

export default combineReducers({ user, token })