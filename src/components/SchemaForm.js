import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { FormControl, Button, Checkbox, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, MenuItem, InputLabel, Select } from '@material-ui/core';
import SimpleList from './lists';
import '../styles/schemaform.scss';
import $ from 'jquery';
import RichTextEditorExample from './RichTextEditorExample';

const MyTextWidget = (props) => {
    return (
        <TextField
            label={props.label}
            fullWidth
            name={props.schema.name}
            required={props.required}
            onChange={(event) => props.onChange(event.target.value)}
            error={props.rawErrors && props.rawErrors.length > 0} />
    );
};

const MyNumberWidget = (props) => {
    return (
        <TextField
            type="number"
            label={props.label}
            fullWidth
            name={props.schema.name}
            required={props.required}
            onChange={(event) => props.onChange(event.target.value)}
            error={props.rawErrors && props.rawErrors.length > 0} />
    );
};

const MySelectWidget = (props) => {
    return (
        <TextField
            label={props.label}
            fullWidth
            select
            required={props.required}
            data-shrink={true}
            name={props.schema.name}
            onChange={(event) => props.onChange(event.target.value)}
            value={props.value}
            error={props.rawErrors && props.rawErrors.length > 0}
            InputLabelProps={props.value ? {
                shrink: true,
            } : { shrink: false, }}
        >
            <MenuItem value="">Choose an option</MenuItem>
            {props.schema.enum.map((option, index) => (
                <MenuItem key={option} value={option}>
                    {props.schema.enumNames[index]}
                </MenuItem>
            ))}
        </TextField>
    );
};

const MyTextAreaWidget = (props) => {
    return (
        <TextField
            multiline
            label={props.label}
            fullWidth
            rows="4"
            required={props.required}
            name={props.schema.name}
            onChange={(event) => props.onChange(event.target.value)}
            error={props.rawErrors && props.rawErrors.length > 0} />
    );
};

const widgets = {
    myTextWidget: MyTextWidget,
    myNumberWidget: MyNumberWidget,
    myTextAreaWidget: MyTextAreaWidget,
    mySelectWidget: MySelectWidget,
    myRichTextEditorWidget: RichTextEditorExample
};

function ErrorListTemplate(props) {
    const { errors, schema } = props;
    let errorsToBeShown = [];
    for (var i = 0; i < errors.length; i++) {
        let error = errors[i].stack.split(":");
        let fieldTtile = schema.properties[error[0]].title;
        errorsToBeShown.push(fieldTtile + error[1].replace("is a required property", "is required!"));
    }
    return (
        <SimpleList errors={errorsToBeShown} />
    );
}

class SchemaForm extends Component {
    state = {
        tagTitle: '',
        jsonSchema: {
            "title": "A registration form",
            "description": "A simple form example.",
            "type": "object",
            "required": ["firstName", "title", "bio", "description"],
            "properties": {
                "firstName": {
                    "type": "string",
                    "title": "First Name",
                    "name": "firstName",
                },
                "title": {
                    "type": "string",
                    "title": "Title",
                    "name": "title",
                    "enum": ["1", "2"],
                    "enumNames": ["one", "two"]
                },
                "bio": {
                    "type": "string",
                    "title": "Bio",
                    "name": "bio"
                },
                "telephone": {
                    "type": "string",
                    "title": "Telephone",
                    "maxLength": 10,
                    "name": "telephone"
                },
                "description": {
                    "type": "string",
                    "title": "Description",
                    "name": "description"
                }
            }
        },
        uiSchema: {
            "firstName": {
                "ui:widget": "myTextWidget",
                'ui:options': {
                    "label": false
                }
            },
            "title": {
                "ui:widget": "mySelectWidget",
                'ui:options': {
                    "label": false
                },
                "ui:placeholder": "Choose an option"
            },
            "bio": {
                "ui:widget": "myTextAreaWidget",
                'ui:options': {
                    "label": false
                }
            },
            "telephone": {
                "ui:widget": "myNumberWidget",
                "ui:options": {
                    "inputType": "tel",
                    "label": false
                }
            },
            "description": {
                "ui:widget": "myRichTextEditorWidget",
                "ui:options": {
                    "label": false
                }
            }
        },
        formData: {
            "firstName":"sweta"
        },
    }

    onValidate = (formData, errors) => {
        let arr = [];
        let requiredFields = this.state.jsonSchema.required;
        let richTextFields = [];
        if (requiredFields && requiredFields.length > 0) {
            for (var i = 0; i < requiredFields.length; i++) {
                let fieldName = requiredFields[i];
                if (!formData[fieldName]) {
                    arr.push(fieldName);
                    if (formData[fieldName] === "") {
                        errors[fieldName].addError("is required");
                    }
                }
            }
        }
        if (arr.length > 0) {
            $(window).scrollTop($('form'));
        } else {
            alert("validation success");
        }
        return errors;
    }

    onSubmit = (event) => {
        alert("submitted");
        this.setState(({ formData: Object.assign({}, event.formData) }));
        console.log(this.state.formData);
    };

    render() {
        return (
            <Fade in={true}>
                <Paper>
                    <Grid item xs={8}>
                        <Grid item xs={6}>
                            <Form noHtml5Validate={true} schema={this.state.jsonSchema} formData={this.state.formData}
                                uiSchema={this.state.uiSchema} widgets={widgets} onSubmit={this.onSubmit}
                                validate={this.onValidate}
                                ErrorList={ErrorListTemplate}
                            >
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
        );
    }
}

export default SchemaForm;
