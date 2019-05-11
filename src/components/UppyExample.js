import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';
import Dashboard from '@uppy/dashboard';
import Form from '@uppy/form';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import React from 'react';
import {TextField, Button, FormControl, InputLabel, Select} from '@material-ui/core';
import ModalElement from './ModalComponent';
import '../styles/uppy-custom.scss';
import ReactDOM from "react-dom";
import $ from 'jquery';

const uppy = Uppy({
    restrictions: { maxNumberOfFiles: 2, allowedFileTypes: ['image/*', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], maxFileSize: 100000 },
    autoProceed: false,
    onBeforeUpload: (files) => {
        let flag=true;
        for(var key in files){
            let fileMeta = files[key].meta;
            for (var key in fileMeta) {
                if (!fileMeta[key]) {
                    flag=false;
                }
            }
        }
        if(!flag){
            uppy.log('Aborting upload because some meta data is empty');
            // show error message to the user
            uppy.info('Please add metadata for all files.', 'error')
            return false
        }
    }
});

class UppyExample extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        isModalOpen: false,
        showMetaForm: false,
        desc:"",
        caption: "",
        type: ""
    }

    componentDidMount() {
        var self = this;

        uppy.use(Dashboard, {
            // trigger: '.UppyModalOpenerBtn',
            inline: true,
            replaceTargetContent: true,
            showProgressDetails: true,
            note: 'Images and video only, 1 file, up to 1 MB',
            height: 400,
            metaFields: [],
            target: '#drag-drop-area',
            thumbnailWidth: 280,
            showLinkToFileUploadResult: true,
            showProgressDetails: false,
            hideUploadButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideCancelButton: false,
            hideProgressAfterFinish: false,
            closeModalOnClickOutside: false,
            closeAfterFinish: false,
            disableStatusBar: false,
            disableInformer: false,
            disableThumbnailGenerator: false,
            animateOpenClose: true,
            proudlyDisplayPoweredByUppy: false,
            showSelectedFiles: true,
            locale: "en",
            browserBackButtonClose: false,
            
        })
        uppy.on('file-added', (file) => {
            console.log('Added file', file);
            uppy.setFileMeta(file.id, {"desc": "", "caption": "", "type": "" });
        })
            .use(XHRUpload, {
                endpoint: '//api2.transloadit.com',
                formData: true,
                fieldName: 'files[]'
            })
            // .use(Form, {
            //     target: "#my-custom-form",
            //     getMetaFromForm: true,
            //     addResultToForm: true,
            //     resultName: 'uppyResult',
            //     triggerUploadOnSubmit: false,
            //     submitOnSuccess: false
            // }),
            

        uppy.on('complete', (result) => {
            const url = result.successful[0].uploadURL
            console.log(url);
        })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        
    }

    saveMetaData = () => {
        this.setState({isModalOpen: false});
        uppy.setFileMeta(this.state.fileId, {"desc": this.state.desc, "caption": this.state.caption, "type": this.state.type });
    }

    confirmHandler = () => {
        this.setState({showMetaForm: true});
    }
    cancelHandler = () => {
        this.setState({isModalOpen: false});
    }

    handleEditClick = (event) => {
        var self = this;
        if(event.target.className == "uppy-DashboardItem-name"){
            // //console.log(event.target);
            //$('.uppy-DashboardFileCard').find('.uppy-DashboardContent-back').trigger('click');
            self.setState({isModalOpen: true});
            self.setState({showMetaForm: true});
            self.setState({fileName:event.target.innerText});
            self.setState({fileId: event.target.parentElement.parentElement.id.split("uppy_")[1]});
        }
    }
    render() {
        return (
            <div>
                <div onClick={this.handleEditClick} id="drag-drop-area"></div>
                <ModalElement open={this.state.isModalOpen}>
                    <div className="generic-modal">
                        <p>Editing the meta data for {this.state.fileName}</p>
                        {this .state.showMetaForm &&
                            <form noValidate autoComplete="off" id="my-form">
                                <TextField
                                    id="name"
                                    label="Description"
                                    defaultValue=""
                                    name="desc"
                                    fullWidth
                                    onChange={this.handleChange('desc')}
                                />
                                <TextField
                                    id="caption"
                                    label="Caption"
                                    multiline
                                    rowsMax="4"
                                    name="caption"
                                    fullWidth
                                    onChange={this.handleChange('caption')}
                                />
                                <FormControl fullWidth>
                                        <InputLabel>File Type</InputLabel>
                                        <Select
                                            name="type"
                                            onChange={this.handleChange('type')}
                                            native
                                            value={this.state.type}>
                                            <option></option>
                                            <option>png</option>
                                            <option>jpg</option>
                                            <option>svg</option>
                                        </Select>
                                </FormControl>
                                {this .state.showMetaForm && <Button variant="contained" color="primary" onClick = {this.saveMetaData}>Save Metadata</Button>}
                            </form>
                        }
                        {/* {!this .state.showMetaForm && <Button variant="contained" color="primary" onClick = {this.confirmHandler}>Change Metadata</Button>} */}
                        
                        <Button variant="contained" onClick={this.cancelHandler}>Cancel</Button>
                    </div>
                </ModalElement>
                
            </div>
        )
    }
}

export default UppyExample;