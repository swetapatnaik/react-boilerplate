import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {TextField,FormControl,InputLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import draftToMarkdown from 'draftjs-to-markdown';

const styles = theme => ({
    customToolbar:{
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
    },
    customWrapper: {
        border: '1px solid rgba(0, 0, 0, 0.42)'
    },
    customEditor :{
        borderTop: '1px solid rgba(0, 0, 0, 0.42)'
    },
    errorWrapper: {
        border: '1px solid #f44336'
    },
    customLabel:{
        position: 'relative',
        display: 'block',
        height: '40px',
    },
  });

class RichTextEditorExample extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
        };
        this.onEditorStateChange =  this.onEditorStateChange.bind(this);
    }
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
        if(draftToMarkdown(convertToRaw(editorState.getCurrentContent())).trim() === ""){
            this.props.onChange("");
        }else{
            this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        }        
      };

    render() {
        const { editorState } = this.state;
        const { classes } = this.props;        
        let self = this;
        return (
            <FormControl>
                <InputLabel 
                error={self.props.rawErrors && self.props.rawErrors.length > 0} 
                className={classes.customLabel} 
                htmlFor={self.props.schema.name}>{self.props.label}</InputLabel>
                <Editor
                editorState={editorState}
                toolbarClassName={classes.customToolbar}
                wrapperClassName={self.props.rawErrors && self.props.rawErrors.length > 0 ? classes.errorWrapper : classes.customWrapper}
                editorClassName={classes.customEditor}
                onEditorStateChange={self.onEditorStateChange}
                />
                <TextField
                hidden
                label="Multiline"
                multiline
                rows="4"
                margin="normal"
                name={self.props.schema.name}
                fullWidth
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(RichTextEditorExample);