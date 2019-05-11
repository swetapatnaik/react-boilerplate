import React, { Component } from "react";
import ExamplePage from "./ExamplePage";
import CircularIndeterminate from './CircularIndeterminate';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';

class Home extends Component {
    render() {
        return (
            <Fade in={true}>
            <Paper>
                <h1>My first React App!</h1>
                <CircularIndeterminate />
                <ExamplePage />
            </Paper>
            </Fade>
        );
    }
}

export default Home;