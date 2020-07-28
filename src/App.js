import React, {Component} from 'react';
import './App.css';
import CareRouter from "./components/Router/CareRouter";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";

//todo: remove the copies of this throughout the app, where individually copied
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


class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <CareRouter/>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
