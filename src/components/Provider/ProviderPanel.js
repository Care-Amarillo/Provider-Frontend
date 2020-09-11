import React, {Component} from 'react';
import Providers from "../Providers/Providers";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import './ProviderPanel.css';
import {Link} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";

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

class ProviderPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            providers: [],
            searchQuery: ""
        }
    }



    componentDidMount(){
        this.loadData();

    }

    searchChanged = (e) => {
        this.setState({
            searchQuery: e.target.value
        }, ()=>{
           this.loadData();
        })

    }

    loadData = async () => {


        let URL = "http://localhost:3000/providersActive";
        


        const response = await axios({
            method: 'get',
            url: URL,
            params:{
               searchQuery: this.state.searchQuery
            }

        });


        const data = await response.data;

        this.setState({
            providers: data
        });

    }

    render() {
        let providerButton = <Button variant="contained" id="providerButton" to="/providerSignup" component={Link}>
            Add New Provider
        </Button> ;
        if(this.props.user && (this.props.user.admin  || this.props.user.superAdmin)){
            providerButton = <div id="noneElement"></div>;
        }
        return (
            <div id="providerContainer">
                <div id="actionContainer">
                    <ThemeProvider theme={theme}>
                    <TextField id="search" label="Search" onChange={this.searchChanged} type="search" variant="outlined"/>
                    </ThemeProvider>
                    {providerButton}


                </div>

                {this.state.providers.map((data, index) => (
                    <Providers key={index} index={index} data={data}/>
                ))}
            </div>
        );
    }
}

export default ProviderPanel;