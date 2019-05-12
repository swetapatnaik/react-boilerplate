import React, {Fragment} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import SchemaForm from "./SchemaForm";
import Header from "./Header";
import NotFound from "./NotFound";
import Recipe from "./Recipe";
import '../styles/main.scss';
import FormWithValidation from './FormWithValidation';
import RichTextEditorExample from './RichTextEditorExample';
import UppyExample from './UppyExample';
import MultiSelectPicker1 from './MultiSelectPicker1';

const App = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
            
            <main>
            <Switch>
                <Redirect from="/home" to="/" />
                <Route exact path = "/" component = {Home} />
                <Route path = "/favorites" component = {Favorites} />
                <Route path = "/schemaform" component = {SchemaForm} />
                <Route path = "/recipes" component = {Recipe} />
                <Route path = "/formwithvalidation" component = {FormWithValidation} />
                <Route path = "/richtexteditorexample" component = {RichTextEditorExample} />
                <Route path = "/uppyexample" component = {UppyExample} />
                <Route path = "/MultiSelectPicker1" component = {MultiSelectPicker1} />
                <Route component = {NotFound} />
            </Switch>
            </main>
        </Fragment>
    </BrowserRouter>
);

export default App;