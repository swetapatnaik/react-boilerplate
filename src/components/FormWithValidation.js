import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import SimpleList from './lists';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    display: 'block'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class FormWithValidation extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: '',
    multiline1: '',
    currency: '',
    error: false,
    errorFields: [],
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    
  };

  handleSubmit = (event) => {
        event.preventDefault();
        //alert('submit clicked');
        let arr = [];
        if(!this.state.name){               
          arr.push("name"); 
        }
        if(!this.state.currency){
          arr.push("currency");
        }
        if(this.state.age.length > 0 && this.state.age >50){
          arr.push("age");
        }
        if(arr.length >0){
          this.setState({ errorFields : arr });
          this.setState({error: true});
          document.getElementById("my-form").scrollTo(0,0);
          //window.scrollTo($('#my-form'));
        }else{
          alert("submit success");
          this.setState({error: false});
        }
    };

  render() {
    const { classes } = this.props;

    return (
    <Fade in={true}>
      <Paper>
      <Grid item xs={8}> 
      <Grid item xs={6}>
      <form className={classes.container} noValidate autoComplete="off" id="my-form" onSubmit={this.handleSubmit}>
      
      {this.state.error && 
        <SimpleList errors={this.state.errorFields} />
      }
        <TextField
          error={this.state.error && this.state.errorFields.indexOf('name') !== -1}
          id="standard-error"
          label="Name"
          defaultValue=""
          onChange={this.handleChange('name')}
          name="name"
          fullWidth
          required={true}
        />
        <TextField
        error={this.state.error && this.state.errorFields.indexOf('multiline') !== -1}
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          fullWidth
        />
        <TextField
        error={this.state.error && this.state.errorFields.indexOf('multiline1') !== -1}
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue=""
          onChange={this.handleChange('multiline1')}
          fullWidth
        />
        <TextField
        error={this.state.error && this.state.errorFields.indexOf('age') !== -1}
          id="standard-number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
        error={this.state.error && this.state.errorFields.indexOf('currency') !== -1}
          fullWidth
          required
          id="standard-select-currency"
          select
          label="Currency"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          <MenuItem key="none" value="">Currency</MenuItem>
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br/>
        <Button type="submit">Submit</Button>
      </form>
      </Grid>
      </Grid>
      </Paper>
    </Fade>
    );
  }
}

FormWithValidation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormWithValidation);
