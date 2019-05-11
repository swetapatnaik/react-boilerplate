import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import MyForm from './MyForm';

class Favorites extends Component {
    render() {
        return (
            <Fade in ={true}>
            <Paper>
                <h1>Favorites Route</h1>
                <MyForm />
                </Paper>
            </Fade>
        );
    }
}

export default Favorites;