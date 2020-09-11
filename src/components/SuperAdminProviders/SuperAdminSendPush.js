import React, {Component} from 'react';
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastr";
import './SuperAdminSendPush.css';



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


const MessageForm = (props) => {
    const classes = useStyles();


    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="title" label="Title" onChange={props.onChangeTitle} variant="outlined"/>
        <TextField id="message" label="Message" onChange={props.onChangeMessage} type="text" multiline variant="outlined"/>
        <Button onClick={props.pushClicked} variant="contained" id="pushButton" >
            Send Push Message
        </Button>
    </form>;
}


class SuperAdminSendPush extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            title: "",
            message: "",
        }
    }

    componentDidMount() {
    }

    // todo: put in its own class so not duplicated across register
    sendPush = async () => {


        let PUSH_URL = "http://localhost:3000/push/globalPush";


        let title = this.state.title;
        let message = this.state.message;
        let body = {
            title: title,
            message: message
        }
        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'post',
            url: PUSH_URL,
            data: body,
            headers: config
        });


        const data = await response.data;
        console.log(`response date is ${JSON.stringify(data)}`);
        this.container.success(`Push Message Sent`, `Success`, {
            closeButton: true,
        });

    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeMessage = (e) => {
        this.setState({
            message: e.target.value,
        });
    }

    pushClicked = () => {
        // console.log("push clicked");
        this.sendPush();
    }

    render() {
        return   (
            <div id="pushContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />

                <MessageForm onChangeTitle={this.onChangeTitle} onChangeMessage={this.onChangeMessage}
                           pushClicked={this.pushClicked}/>
            </div>
        );

    }
}

export default SuperAdminSendPush;