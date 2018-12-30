import React from 'react';
import {withStyles, Button} from '@material-ui/core';
import headerImage from '../images/overview-background.png';
import logoImage from '../../../common/images/singularity-logo.png';
import Tiles from './Tiles';
import {Routes} from '../../../common/components/App';
import SingularityVideo from './SingularityVideo';
import {Link, Switch, Route} from 'react-router-dom';

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
    padding: '0 15px 0 15px',
    marginRight: 'auto',
    marginLeft: 'auto',
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
    marginTop: '20px',
  },
};

const HelpVideoInformation = withStyles(styles)(({classes}) => (
  <React.Fragment>
    <SingularityVideo />
    <div className={classes.overviewText}>
      <p>SingularityNET is an open and decentralized network of AI services made accessible through blockchain. AI
        developers publish their services onto the SingularityNET network where they can be used by anyone with an
        internet connection. This Dapp is a front-end for exploring available AI services and interacting with them
        through a web-UI</p>
      <Button className={classes.button}
              component={Link}
              variant="outlined"
              color="primary"
              to={Routes.connectWallet}>
        LET'S GET STARTED
      </Button>
    </div>
  </React.Fragment>
));

const ConnectWallet = withStyles(styles)(({classes}) => (
  <React.Fragment>
    <div className={classes.overviewText}>
      <p>This Dapp allows you to browse the list of SingularityNET Agents from the SingularityNET Registry.
        You need a Metamask wallet to invoke a service. Please click the above button to install it.</p>
      <Button className={classes.button}
              variant="contained"
              color="primary"
              href="https://metamask.io/">
        Metamask
      </Button>
    </div>
  </React.Fragment>
));

const Providers = ({ classes, match }) => (
  <div className={classes.main}>
    <header className={classes.header}>
      <h1>
        <img src={logoImage} alt="SingularityNET"/>
      </h1>
    </header>
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={classes.stepGuide}>STEP GUIDE</div>
        <Tiles match={match}/>
        <Switch>
          <Route path={`${match.url}/`} exact component={HelpVideoInformation} />
          <Route path={`${match.url}/connectWallet`} component={ConnectWallet} />
        </Switch>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Providers);