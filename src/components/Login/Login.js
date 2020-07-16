import React, {Component} from 'react';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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


    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="email" label="Email" onChange={props.onChangeEmail} variant="outlined"/>
        <TextField id="password" label="Password" onChange={props.onChangePass} type="password" variant="outlined"/>
        <Button onClick={props.loginClicked} variant="contained" color="primary">
            Login
        </Button>
    </form>;
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

        let URL = "https://careamabrain.cmcoffee91.dev/users/authenticate";
        // let URL = "http://localhost:3000/users/authenticate";

        this.setState({
            jwt: ""
        });

        console.log("state " + JSON.stringify(this.state));

        const response = await axios({
            method: 'post',
            url: URL,
            data: {
                email: this.state.email,
                password: this.state.password
            }
        });


        const data = await response.data;
        console.log("data " + JSON.stringify(data));
        const user = data.user;
        const token = data.token;
        console.log("user " + JSON.stringify(data.user));
        console.log("token " + JSON.stringify(data.token));

        this.setState({
            jwt: token
        });

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
        this.login();
    }

    render() {
        return (
            <div id="loginContainer">
                <LoginForm onChangeEmail={this.onChangeEmail} onChangePass={this.onChangePass}
                           loginClicked={this.loginClicked}/>
            </div>
        );
    }
}

export default Login;