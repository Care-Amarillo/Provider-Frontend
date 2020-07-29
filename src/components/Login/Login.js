import React, {Component} from 'react';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import {ToastContainer} from "react-toastr";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#132C3C",
        },
        secondary: {
            main: "#132C3C",
        },
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height:'100vh'
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
        display: "flex",
        flexDirection: "column"
    },
}));


const LoginForm = (props) => {
    const classes = useStyles();


    return <ThemeProvider theme={theme}><form className={classes.form} noValidate autoComplete="off">
        <TextField id="email" label="Email" onChange={props.onChangeEmail} variant="outlined"/>
        <TextField id="password" label="Password" onChange={props.onChangePass} type="password" variant="outlined"/>
        <Button onClick={props.loginClicked} variant="contained" id="loginButton" >
            Login
        </Button>
        <Button to="/register" component={Link} variant="contained" id="loginButton">
            Register
        </Button>
    </form></ThemeProvider>;
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            email: "",
            password: "",
        }
    }

    componentDidMount() {
    }

    // todo: put in its own class so not duplicated across register
    login = async () => {

        this.props.setToken(this.state);

    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePass = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    loginClicked = () => {
        if(this.state.email === "" || this.state.password === ""){
            this.container.error(`Please fill out all fields`, `Error`, {
                closeButton: true,
            });
            return ;
        }
        this.login();
    }

    render() {
        return !this.props.token ?  (
            <div id="loginContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />

                <LoginForm onChangeEmail={this.onChangeEmail} onChangePass={this.onChangePass}
                           loginClicked={this.loginClicked}/>
            </div>
        ):  <Redirect to="/provider"/>;

    }
}

export default Login;