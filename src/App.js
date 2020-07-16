import React, {Component} from 'react';
import './App.css';
import CareAppBar from "./components/CareAppBar/CareAppBar";
import CareRouter from "./components/Router/CareRouter";
import CareBottomNav from "./components/CareBottomNav/CareBottomNav";



class App extends Component {
    constructor(props){
        super(props);

    }



    render() {
        return (
            <div className="App">
                {/*<CareAppBar></CareAppBar>*/}
                {/*<header className="App-header">*/}
                {/*</header>*/}
                <CareRouter></CareRouter>
                {/*<CareBottomNav></CareBottomNav>*/}

            </div>
        );
    }
}

export default App;
