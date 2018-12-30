import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Routes} from '../../../common/components/App';
import enableTick from '../images/enable-tick.png';
import disableTick from '../images/disable-tick.png';

const styles = {
  tilesContainer: {
    width: '70%',
    margin: '0 auto',
  },
  tile: {
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

const Tile = withStyles(styles)(({ classes, image, boxTitle, link, linkLabel }) => (
  <div className={classes.tile}>
    <div className={classes.stepGuideBox}>
      <div className={classes.enableDisable}>
        <img src={image} alt=""/>
      </div>
      <div className={classes.boxTitle}>{boxTitle}</div>
      <Link to={link} className={classes.link}>{linkLabel}</Link>
    </div>
  </div>
));

const Tiles = ({classes, match}) => (
  <div>
    <Grid container className={classes.tilesContainer} spacing={32}>
      <Grid item xs={12} sm={6}>
        <Tile image={enableTick} boxTitle="OVERVIEW"
               link={Routes.services} linkLabel="View Services"/>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Tile image={match.url.endsWith(Routes.connectWallet) ? enableTick : disableTick}
              boxTitle="CONNECT WALLET"
              link={Routes.connectWallet} linkLabel="Connect to Wallet"/>
      </Grid>
    </Grid>
  </div>
);


export default withStyles(styles)(Tiles);