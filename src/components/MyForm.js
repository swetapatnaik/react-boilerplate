import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';

class MyForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tag:{
                email: '',
                price: ''
            },
            arr: ["a","b"]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const { tag } = this.state;
        tag[event.target.name] = event.target.value;
        this.setState({ tag : tag });
        //console.log(this.state.tag.email);
        //console.log(this.state.tag.price);
    }

    handleSubmit(){
        let arr = [];
        arr.push("c");
        this.setState({ arr : arr });
        console.log(this.state.tag);
    }

    render() {
        const { email , price} = this.state.tag;
        return (
            <div>
                <p>{this.state.arr}</p>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <FormControl fullWidth={true}>
                    <TextValidator
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'incorrect email format']}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <TextValidator
                        multiline
                        label="Price"
                        onChange={this.handleChange}
                        name="price"
                        value={price}
                        validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:[0-9]']}
                        errorMessages={['should be a number', 'must not be more than 255']}
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
            </ValidatorForm>
            </div>
        );
    }
}
export default MyForm;