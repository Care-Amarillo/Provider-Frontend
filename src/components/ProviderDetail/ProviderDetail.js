import React, {Component} from 'react';
import './ProviderDetail.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
} from "react-router-dom";


const mapApiKey = "AIzaSyCOvmLGpbzVEgMywSh3g4g6mbaynTbdIiU";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        // justifyContent:"center",
        margin:"10px",
        width: "60%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 17,
        textAlign:"start",
        fontWeight: "bold"
    },
    secondText: {
        textAlign:"start"
    },
    sound: {
        width:"100%"
    },
    pos: {
        marginBottom: 12,
    },
});

const ProviderMap = (props) => {
    const data = props.data;

    // const lat = data.lat;
    // const long = data.long;

    const lat = "35.1957878";
    const long = "-101.8515413";
    const mapSrc = `https://www.google.com/maps/embed/v1/place?q=${lat},${long}&key=${mapApiKey}`;

       let mapIframe = <iframe width="100%" height="450" frameborder="0"
                src={mapSrc} allowfullscreen></iframe>;
    return mapIframe;
}

const ProviderDtlCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const title = data.title;
    const name = data.name;
    console.log("title :" + title);
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    {name}
                </Typography>
                <Typography className={classes.secondText} >
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <Link className="barLink"   to={{
                        pathname:"/providerDtl",
                        state: {
                            data:data
                        }
                    }}>Learn More</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

const ProviderDtlPhoneCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const phone = data.phone;
    const href = `tel:${phone}`;
    console.log("phone:" + phone);
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    Phone
                </Typography>
                <Typography className={classes.secondText} >
                    {phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <a href={href}>CALL US!</a>
                </Button>
            </CardActions>
        </Card>
    )
}


const ProviderDtlEmailCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const email = data.email;
    const href = `mailto:${email}`;
    console.log("email:" + email);
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    Email
                </Typography>
                <Typography className={classes.secondText} >
                    {email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <a href={href}>EMAIL US!</a>
                </Button>
            </CardActions>
        </Card>
    )
}

const isIOSDevice = () => {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

const ProviderDtlAddressCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const address = data.address;
    // const lat = data.lat;
    // const long = data.long;

    const lat = "35.1957878";
    const long = "-101.8515413";

    const appleDrivingDirections = `https://maps.apple.com/?q=${lat},${long}`;
    const androidDrivingDirections = `google.navigation:q=${lat},${long}`;
    const webDrivingDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;

    let directionsToUse = webDrivingDirections;

    if(isIOSDevice()){
        directionsToUse = appleDrivingDirections;
    }


    console.log("address:" + address);
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    Address
                </Typography>
                <Typography className={classes.secondText} >
                    {address}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    <a target="_blank" href={directionsToUse}>GET DIRECTIONS</a>
                </Button>
            </CardActions>
        </Card>
    )
}

class ProviderDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        console.log("this provider dtl data: " + JSON.stringify(this.props.location.state.data));
        this.setState({
            data: this.props.location.state.data
        });
    }

    render() {
        return (
            <div id="providerDtlContainer">
                <h1>
                    {this.state.data.name}
                </h1>
                <div id="cardContainer">
                    <ProviderDtlPhoneCard data={this.state.data} />
                    <ProviderDtlEmailCard data={this.state.data} />
                    <ProviderDtlAddressCard data={this.state.data} />
                </div>
                <div id="cardContainer">
                    <ProviderDtlCard data={this.state.data} />
                    <ProviderDtlCard data={this.state.data} />
                    <ProviderDtlCard data={this.state.data} />
                </div>
                <div>
                    <ProviderMap/>
                </div>

            </div>
        );
    }
}

export default ProviderDetail;