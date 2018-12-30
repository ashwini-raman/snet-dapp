import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import {Link} from 'react-router-dom';

const styles = {
  tile: {
    minWidth: '100px',
    width: '33.3333%',
    padding: '0 15px',
  },
  stepGuideBox: {
    margin: '0px',
    padding: '35px 10px',
    border: '1px solid #fff',
    borderRadius: '4px',
    color: '#fff',
    position: 'relative',
    textAlign: 'center',
  },
  enableDisable: {
    position: 'absolute',
    top: '-25px',
    left: '44%',
    margin: '0px',
  },
  boxTitle: {
    padding: '0 0 10px 0',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
  }
};

const Tiles = ({ classes, image, boxTitle, link, linkLabel }) => (
  <div className={classes.tile}>
    <div className={classes.stepGuideBox}>
      <div className={classes.enableDisable}>
        <img src={image} alt=""/>
      </div>
      <div className={classes.boxTitle}>{boxTitle}</div>
      <Link to={link} className={classes.link}>{linkLabel}</Link>
    </div>
  </div>
);

export default withStyles(styles)(Tiles);