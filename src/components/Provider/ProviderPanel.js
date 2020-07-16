import React, {Component} from 'react';
import Providers from "../Providers/Providers";
import axios from "axios";

class ProviderPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            providers: []
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async () => {

        // const response = await fetch(URL, {
        //     // mode: 'no-cors',
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //     },
        // },);

        // const data = await response.json();
        // console.log("data " + JSON.stringify(data));

        let URL = "https://careamabrain.cmcoffee91.dev/providers";
        // let URL = "http://localhost:3000/providers";

        this.setState({
            providers: []
        });


        const response = await axios({
            method: 'get',
            url: URL,
        });


        const data = await response.data;
        console.log("data " + JSON.stringify(data));

        this.setState({
            providers: data
        });

    }

    render() {
        return (
                this.state.providers.map((data, index) => (
                    <Providers key={index} index={index} data={data}></Providers>
                ))
        );
    }
}

export default ProviderPanel;