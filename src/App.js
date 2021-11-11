import React, { Component } from 'react'
import axios from 'axios'
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import "./App.css"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            city: "",
            entries: [],
        }
    }

    handleChange = e => {
        this.setState({currentDate: e.target.value})
        const year = this.state.currentDate.getFullYear()
        const month = this.state.currentDate.getMonth()
        const day = this.state.currentDate.getDate()
        const hour = this.state.currentDate.getHours()
        const minute = this.state.currentDate.getMinutes()
        axios.post("http://127.0.0.1:5000/", {year, month, day, hour, minute})
            .then(data => this.setState({entries: data.data}))
    }
    render() {
        return (
            <div>
                <DateTimePickerComponent
                    placeholder="Choose a date and time"
                    value={this.state.currentDate}
                    onChange={this.handleChange}
                    format="dd-MMM-yy HH:mm"
                    step={60}/>
                <TableContainer component={Paper} className="table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell align="right">Latitude</TableCell>
                                <TableCell align="right">Longitude</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Visibility</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.entries.map((row) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {new Date(row.timestamp * 1000).toString()}
                                    </TableCell>
                                    <TableCell align="right">{row.latitude}</TableCell>
                                    <TableCell align="right">{row.longitude}</TableCell>
                                    <TableCell align="right">BLANK FOR NOW</TableCell>
                                    <TableCell align="right">{row.visibility}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
