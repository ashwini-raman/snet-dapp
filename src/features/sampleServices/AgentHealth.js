import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  healthy: {
    backgroundColor: '#2ac600',
  },
  sick: {
    backgroundColor: '#C20000',
  },
  agentHealth: {
    width: '13px',
    height: '13px',
    display: 'inline-block',
    borderRadius: '50px',
  }
};

const AgentHealth = ({classes, healthy}) => (
  <span className={classNames({
    [classes.agentHealth]: true,
    [classes.healthy]: healthy,
    [classes.sick]: !healthy})}/>
);

export default withStyles(styles)(AgentHealth);