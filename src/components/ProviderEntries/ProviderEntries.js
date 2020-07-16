import React, {Component} from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import  format  from "date-fns/format";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import 'date-fns';
import axios from "axios";

const CLIENT_ID = '461686716459-krre353uecr54mdkbbj094vf9mevti55.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCOvmLGpbzVEgMywSh3g4g6mbaynTbdIiU';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

class ProviderEntries extends Component {
    constructor(props){
        super(props);
        this.state = {
            entries: [],
            selectedStartDate: Date(),
            selectedEndDate: Date(),
        }
    }



    componentDidMount() {
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
        let providerId = "5ef9bfe4cd24582b13b7055d";

        let URL = "https://careamabrain.cmcoffee91.dev/providerEntries/" + providerId;
        // let URL = "http://localhost:3000/providers";

        this.setState({
            entries: []
        });

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXNoSWQiOiIiLCJhZG1pbiI6ZmFsc2UsInN1cGVyQWRtaW4iOnRydWUsInVzZXJUeXBlIjozLCJhY3RpdmUiOnRydWUsIl9pZCI6IjVlZjliODcwY2QyNDU4MmIxM2I3MDU1YyIsImNyZWF0ZWRBdCI6IjIwMjAtMDYtMjlUMDk6NDY6MjQuNzkzWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDYtMjlUMDk6NDY6MjQuNzkzWiIsImZOYW1lIjoiVG9tbXkiLCJsTmFtZSI6IkpvaG5zb24iLCJlbWFpbCI6InRlc3RlckBhbWFyaWxsb2NvbGxlZ2UuY29tIiwicGhvbmUiOiI4MDYyMzQ1MzgzIiwidGl0bGUiOiJTdXBlciBBZG1pbiIsIl9fdiI6MCwiaWF0IjoxNTk0NTQ2OTQ1fQ.ilbHub9Bmof0cFJxirK4ZeJMar9rBncdDn4-d9tRbCc";

        const config = {
             "Authorization": `Bearer ${token}`
        };

        const response = await axios({
            method: 'get',
            url: URL,
            headers: config
        });




        const data = await response.data;
        console.log("data " + JSON.stringify(data));

        this.setState({
            entries: data
        });

    }

    handleStartDateChange = (e) => {
        // setSelectedStartDate(e);
        this.setState({
            selectedStartDate: e
        });
    };

    handleEndDateChange = (e) => {
        // setSelectedEndDate(e);
        this.setState({
            selectedEndDate: e
        });
    };


    exportReportToGoogleSheets = () =>{
        this.handleClientLoad();

    }



    handleClientLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }



    updateSignInStatus = (isSignedIn) => {
        console.log("updateSignInStatus = " + isSignedIn);
        if (isSignedIn) {
            this.makeGoogleSheetsApiCall();
            // saveDataToSheet();
        }
    }

    initClient = async() => {
        await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });

        await window.gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: SCOPES
        });

        window.gapi.auth2.getAuthInstance().signIn();

        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);

        // Handle the initial sign-in state.
        this.updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }


    makeGoogleSheetsApiCall = async() => {


        let response = await window.gapi.client.sheets.spreadsheets.create({
            properties: {
                title: "Provider Entries"
            }
        });

        let result = response.result;
        let sheets = response.result.sheets;
        let sheetOne = sheets[0];
        let sheetId = result.spreadsheetId;
        let sheetUrl = result.spreadsheetUrl;
        console.log("sheets " + sheets);
        console.log("sheetOne " + sheetOne);
        console.log("sheetOne id " + sheetId);
        console.log("sheetOne url " + sheetUrl);

        this.saveDataToGoogleSheet(sheetId);

        // window.gapi.client.sheets.spreadsheets.create({
        //     properties: {
        //         title: "Provider Entries"
        //     }
        // }).then((response) => {
        //
        //     console.log(response.result);
        //
        //     var result = response.result;
        //     var sheets = response.result.sheets;
        //     var sheetOne = sheets[0];
        //     var sheetId = result.spreadsheetId;
        //     var sheetUrl = result.spreadsheetUrl;
        //     console.log("sheets " + sheets);
        //     console.log("sheetOne " + sheetOne);
        //     console.log("sheetOne id " + sheetId);
        //     console.log("sheetOne url " + sheetUrl);
        //
        //     // crtc.url = sheetUrl.toString();
        //     // $scope.urlShow = true;
        //     // $scope.$digest();
        //     // console.log("url is " + crtc.url);
        //     // saveDataToSheet(sheetId);
        //
        //
        //
        // });


    }

    saveDataToGoogleSheet = (sheetId) => {


        /*

        "Question Number": crtc.members[i].num ,
                    "Amount": crtc.members[i].amount ,
                    "Average Grade": crtc.members[i].avgGrade ,
                    "Question Type": crtc.members[i].type,
                    "Answer Choice A": crtc.members[i].a,
                    "Answer Choice B": crtc.members[i].b,
                    "Answer Choice C": crtc.members[i].c,
                    "Answer Choice D": crtc.members[i].d,
                    "True": crtc.members[i].t,
                    "False": crtc.members[i].f

        */

        var len = this.state.entries.length;
        var arr = new Array(len);
        // tovc.tovresults = results;
        arr[0] = new Array(3);
        arr[0][0] = "Change Amount";
        arr[0][1] = "Date";

        for (var i = 1; i < len + 1; i++) {
            arr[i] = new Array(3);
            for (var j = 0; j < 2; j++) {


                if (j == 0) {
                    arr[i][j] = this.state.entries[i - 1]["amountChanged"];
                } else if (j == 1) {
                    let formattedDate = format(new Date(this.state.entries[i-1]["createdAt"]), "MMMM d, yyyy H:mma").toString();
                    arr[i][j] = formattedDate;
                }

            }
        }


        var data = [];
        data.push({
            range: 'Sheet1',
            values: arr
        });
        // Additional ranges to update.

        var body = {
            data: data,
            valueInputOption: 'RAW'
        };

        var spreadsheetId = sheetId;

        console.log("arr " + JSON.stringify(arr));

        window.gapi.client.sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: spreadsheetId,
            resource: body
        }).then((response) => {
            var result = response.result;
            console.log(`${result.totalUpdatedCells} cells updated.`);
        });
    }

    //todo: add date to filename
    exportReport = () =>{
        let arr = [];
        let len = this.state.entries.length;
        for (let i = 0; i < len; i++) {
            let formattedDate = format(new Date(this.state.entries[i].createdAt), "MMMM d, yyyy H:mma").toString();
            arr.push({
                "Amount Changed": this.state.entries[i].amountChanged,
                "Date":formattedDate
            });
        }

        this.downloadCSV({
            filename: "provider-entry-report-data.csv"
        }, arr);
    }


    //todo: put in separate files so multiple components can call it
    downloadCSV = (args, report) => {
        let data, filename, link;
        let csv = this.convertArrayOfObjectsToCSV({
            data: report
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    //todo: put in separate files so multiple components can call it
    convertArrayOfObjectsToCSV = (args) => {
        let result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    render() {
        return (
            <Container maxWidth="lg" className="car-container">
                {/*<h4>Welcome, {props.user.username}</h4>*/}
                <div className="flex-container">
                    {/*<Chart />*/}
                    {/*<Total />*/}
                    {/*<AddCar carTotal={props.cars.length} />*/}
                    <Button variant="contained" color="primary" onClick={this.exportReport}>
                        Export
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.exportReportToGoogleSheets}>
                        Export To Google Sheets
                    </Button>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div id="dateContainer">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Start Date"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-end"
                                label="End Date"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount Changed</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.entries.map((entry, idx) => (
                            <TableRow key={entry["_id"]}>
                                <TableCell>{entry["amountChanged"]}</TableCell>
                                <TableCell>{format(new Date(entry["createdAt"]), "MMMM d, yyyy H:mma")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        );
    }
}

export default ProviderEntries;