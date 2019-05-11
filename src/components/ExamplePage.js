import React, { Component } from 'react'
import {SchemaForm, utils} from 'react-schema-form'
import {Button, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'

class ExamplePage extends Component {
        state = {
            tests: [
                {label: 'Simple', value: "/src/components/data/simple.json"}
            ],
            validationResult: {},
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: ''
        }
    
    // componentDidMount(){
    //     let value = "/src/components/data/simple.json";
    //     fetch(value)
    //     .then(x => x.json())
    //     .then(({schema, form}) => {
    //         this.setState({
    //             schemaJson: JSON.stringify(schema, undefined, 2),
    //             formJson: JSON.stringify(form, undefined, 2),
    //             schema,
    //             model: {},
    //             form,
    //         })
    //         console.log(this.state);
    //     })
        
    // }
    setStateDefault = () => this.setState({model: {}})

    onModelChange = (key, val, type) => {
        //console.log('ExamplePage.onModelChange:', key, val)
        let newModel = this.state.model
        utils.selectOrSet(key, newModel, val, type)
        this.setState({model: newModel})
        console.log(this.state.model);
        let result = utils.validateBySchema(this.state.schema, this.state.model)
        console.log(result);
    }

    onValidate = () => {
        console.log('ExamplePage submit is called')
        let result = utils.validateBySchema(this.state.schema, this.state.model)
        this.setState({validationResult: result})
        if(this.state.validationResult.valid){
            console.log(this.state.model);
            console.log(this.state.validationResult.valid);
        }
    }

    onSelectChange = ({target: {value}}) => {
        if (!value) {
            return this.setState({
                schemaJson: '',
                formJson: '',
                selected: '',
                schema: {},
                model: {},
                form: []
            })
        }

        fetch(value)
            .then(x => x.json())
            .then(({schema, form}) => {
                this.setState({
                    schemaJson: JSON.stringify(schema, undefined, 2),
                    formJson: JSON.stringify(form, undefined, 2),
                    selected: value,
                    schema,
                    model: {},
                    form,
                })
            })
    }

    render() {
        let mapper = {
            // 'rc-select': RcSelect
        }

        let schemaForm = ''
        let validate = ''
        if (this.state.form.length > 0) {
            schemaForm = (
                    <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model}
                                onModelChange={this.onModelChange} mapper={mapper}/>
            )
            validate = (
                <div>
                    <Button variant='raised' color='primary' onClick={this.onValidate}>Submit</Button>
                    {/* <Button variant='raised' color='primary' onClick={this.setStateDefault}>Throw temp model
                        in</Button> */}
                    <pre>{JSON.stringify(this.state.validationResult, undefined, 2)}</pre>
                </div>
            )
        }

        return (
            <div className='col-md-12'>
                <h1>Schema Form Example</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h3 style={{display: 'inline-block'}}>The Generated Form</h3>
                        {schemaForm}                        
                    </div>
                    <div className="col-sm-8">
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model, undefined, 2)}</pre>
                        {validate}
                    </div>
                    <div className='col-sm-8'>
                        <h3>Select Example</h3>
                        <FormControl classes={{root: 'form-group'}} style={{minWidth: 150}}>
                            <InputLabel htmlFor="select-test">select-test</InputLabel>
                            <Select
                                autoWidth
                                name='selectTest'
                                inputProps={{name: 'selectTest', id: 'select-test'}}
                                value={this.state.selected}
                                onChange={this.onSelectChange}>
                                {this.state.tests.map(({label, value}) =>
                                    <MenuItem key={value} value={value}>{label}</MenuItem>)}
                            </Select>
                        </FormControl>
                        {/* <h3>Form</h3>
                        <AceEditor mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onFormChange} name='aceForm'
                                   value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <AceEditor mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onSchemaChange} name='aceSchema'
                                   value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ExamplePage;
