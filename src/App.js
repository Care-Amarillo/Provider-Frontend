import React, {Component} from 'react';
import './App.css';
import CareRouter from "./components/Router/CareRouter";




class App extends Component {
    constructor(props){
        super(props);
    }



    render() {
        return (
            <div className="App">
                <CareRouter/>
            </div>
        );
    }
}

export default App;
