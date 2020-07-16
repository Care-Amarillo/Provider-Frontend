import React, {Component} from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import format from "date-fns/format";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import 'date-fns';
import axios from "axios";

class AuditEntries extends Component {
    constructor(props) {
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

        let URL = "https://careamabrain.cmcoffee91.dev/auditEntries/";
        // let URL = "https://careamabrain.cmcoffee91.dev/auditEntries/" + providerId;

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

    //todo: add date to filename
    exportReport = () => {
        let arr = [];
        let len = this.state.entries.length;
        for (let i = 0; i < len; i++) {
            let formattedDate = format(new Date(this.state.entries[i].createdAt), "MMMM d, yyyy H:mma").toString();
            arr.push({
                "Amount Changed": this.state.entries[i].amountChanged,
                "Date": formattedDate
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
                            <TableCell>Date</TableCell>
                            <TableCell>Table Reference</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Request Method</TableCell>
                            <TableCell>Endpoint</TableCell>
                            {/*<TableCell>Creator First Name</TableCell>*/}
                            {/*<TableCell>Creator Last Name</TableCell>*/}
                            {/*<TableCell>Creator Email</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.entries.map((entry, idx) => (
                            <TableRow key={entry["_id"]}>
                                <TableCell>{format(new Date(entry["createdAt"]), "MMMM d, yyyy H:mma")}</TableCell>
                                <TableCell>{entry["ref"]}</TableCell>
                                <TableCell>{entry["action"]}</TableCell>
                                <TableCell>{entry["requestMethod"]}</TableCell>
                                <TableCell>{entry["endpoint"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        );

    }
}

export default AuditEntries;