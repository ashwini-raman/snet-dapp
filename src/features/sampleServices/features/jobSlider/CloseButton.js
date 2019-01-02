import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';

const styles = {
  container: {
    fontSize: '30px',
    textAlign: 'right',
  },
  closeButton: {
    textDecoration: 'none',
    color: '#0066ff',
  },
};

const CloseButton = ({ classes, onClickAction }) => (
  <div className={classes.container}>
    <a href="#" className={classes.closeButton} onClick={onClickAction}>&times;</a>
  </div>
);

export default withStyles(styles)(CloseButton);