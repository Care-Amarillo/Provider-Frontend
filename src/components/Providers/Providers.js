import React, {Component} from 'react';
import './Providers.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
} from "react-router-dom";



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


const ProviderCard = (props) => {
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

class Providers extends Component {
    render() {
        return (
            <div id="providerContainer">
                <ProviderCard data={this.props.data}></ProviderCard>
            </div>
        );
    }
}


export default Providers;