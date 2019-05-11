import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgb(244,67,54)',
    color: 'rgb(244,67,54)'
  },
  item:{
    listStyle: 'disc',
    color: 'rgba(244, 67, 54, 1)'
  }
});

function SimpleList(props) {
  const { classes, errors } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ErrorIcon />
          <ListItemText className="span-item" primary="Please resolve the below errors" />
        </ListItem>
        {errors.map((value,index) => {
          let err="";
          if(value.stack){err = value.stack}else{err=value}
        return <ListItem key={"error"+index}>
          <ListItemText className="span-item" primary={err} />
        </ListItem>
        
        })
        }
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
