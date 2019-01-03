import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Button} from '@material-ui/core';

const styles = {
  container: {
    textAlign: 'right',
  },
  closeButton: {
    fontSize: '30px',
    textDecoration: 'none',
    color: '#0066ff',
  },
};

const CloseButton = ({ classes, onClickAction }) => (
  <div className={classes.container}>
    <Button className={classes.closeButton} onClick={onClickAction}>&times;</Button>
  </div>
);

export default withStyles(styles)(CloseButton);