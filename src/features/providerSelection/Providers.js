import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Grid} from '@material-ui/core';
import headerImage from './images/overview-background.png';
import logoImage from '../../common/images/singularity-logo.png';
import enableTick from './images/enable-tick.png';
import disableTick from './images/disable-tick.png';
import Tiles from './Tiles';
import {Routes} from '../../common/components/App';
import SingularityVideo from './SingularityVideo';
import {Link} from 'react-router-dom';

const styles = {
  main: {
    width: '100%',
    fontFamily: 'Arial',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.42857143',
  },
  header: {
    height: '198px',
    padding: '10px',
    position: 'relative',
    zIndex: '22',
  },
  body: {
    width: '100%',
    backgroundImage: `url(${headerImage})`,
    margin: '0px',
    padding: '80px 0 0 0',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: '0',
    zIndex: '1',
    color: '#fff',
    backgroundPosition: '0 -200px',
  },
  container: {
    // width: '90%',
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    padding: '0 15px 0 15px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  tilesContainer: {
    width: '70%',
    margin: '0 auto',
  },
  stepGuide: {
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    margin: '0 0 40px 0',
    padding: '129px 0 0 0',
  },
  overviewText: {
    margin: '36px auto',
    width: '80%',
    color: '#0066ff',
    textAlign: 'center',
    fontSize: '20px',
  },
  button: {
    color: '#0066ff',
    backgroundColor: '#fff',
    borderColor: '#0066ff',
    borderRadius: '50px',
    padding: '6px 14px',
    fontSize: '12px',
    border: '1px solid transparent',
    display: 'inline-block',
    marginTop: '10px',
  },
};

const Providers = ({ classes }) => (
  <div className={classes.main}>
    <header className={classes.header}>
      <h1>
        <img src={logoImage} alt="SingularityNET"/>
      </h1>
    </header>
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.stepGuide}>STEP GUIDE</div>
        <div>
          <Grid container className={classes.tilesContainer}>
            <Grid item xs={12} sm={6}>
              <Tiles image={enableTick} boxTitle="OVERVIEW"
                     link={Routes.services} linkLabel="View Services"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tiles image={disableTick} boxTitle="CONNECT WALLET"
                     link={Routes.connectWallet} linkLabel="Connect to Wallet"/>
            </Grid>
          </Grid>
        </div>

        <SingularityVideo />

        <div className={classes.overviewText}>
          <p>SingularityNET is an open and decentralized network of AI services made accessible through blockchain. AI
            developers publish their services onto the SingularityNET network where they can be used by anyone with an
            internet connection. This Dapp is a front-end for exploring available AI services and interacting with them
            through a web-UI</p>
          <Link to={Routes.connectWallet}>
            <div className={classes.button}>LET'S GET STARTED</div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Providers);