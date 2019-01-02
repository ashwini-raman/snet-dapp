import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import channelHelper from '../../ChannelHelper';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Grid, Tab, Tabs, TextField, Typography} from '@material-ui/core/index';

const styles = {
  serviceDetails: {
    borderRadius: '5px',
    borderTop: '2px solid #0066ff',
    backgroundColor: '#fff',
    padding: '10px 10px',
    boxShadow: '1px 1px 10px #e0dbdb',
  },
  fundsTitle: {
    fontSize: '14px',
    color: '#000',
    fontWeight: 'bold',
  },
  channelsSec: {
    margin: '15px 0 0 0',
    fontSize: '14px',
  },
  enabled: {
    color: '#0066ff',
  },
  disabled: {
    color: '#757577',
  },
  textField: {
    height: '30px',
  },
  buttonContainer: {
    marginTop: '20px',
  }
};

const ServiceDetails = (props) => {
  const { classes, jobSliderData } = props;
  return (<div className={classes.serviceDetails}>
      <Tabs value={jobSliderData.valueTab} indicatorColor='primary'>
        <Tab disabled={(!jobSliderData.startJobFundInvokers)}
             label={<span className={classes.fundsTitle}>Fund</span>}/>
        <Tab disabled={channelHelper.getChannelId() !== '' && jobSliderData.openChaining}
             label={<span className={classes.fundsTitle}>Invoke</span>}/>
        <Tab disabled={channelHelper.getChannelId() !== '' && jobSliderData.openChaining}
             label={<span className={classes.fundsTitle}>Result</span>}/>
      </Tabs>
      {jobSliderData.valueTab === 0 && <FundTab {...props}/>}
      {jobSliderData.valueTab === 1 && <InvokeTab {...props}/>}
      {jobSliderData.valueTab === 2 && <ResultTab {...props}/>}
    </div>
  );
};

const TabContainer = (props) => (
  <Typography component="div" style={{ padding: '10px' }}>
    {props.children}
  </Typography>
);

const FundTab = ({ classes, jobSliderData }) => (
  <TabContainer>
    <div className={classNames({
      [classes.channelsSec]: true,
      [classes.enabled]: jobSliderData.startJobFundInvokers,
      [classes.disabled]: !jobSliderData.startJobFundInvokers,
    })}>
      <Grid container spacing={16} wrap='wrap'>
        <Grid item xs={12} sm={2}>Amount:</Grid>
        <Grid item xs={12} sm={4} className={classes.textField}>
          <TextField variant='outlined' className={classes.textField}/>
        </Grid>
        <Grid item xs={12} sm={2}>Expiration:</Grid>
        <Grid item xs={12} sm={4} className={classes.textField}>
          <TextField variant='outlined' className={classes.textField}/>
        </Grid>
      </Grid>
      <Grid container className={classes.buttonContainer}>
        <Grid item xs={12} alignItems='flex-end'>
          <Button variant='contained' disabled={!jobSliderData.startJobFundInvokers}>Reserve Funds</Button>
        </Grid>
      </Grid>
      {//TODO:
        /*<p style={{fontSize: "12px",color: "red"}}>*/}
      {/*{this.state.depositopenchannelerror!==''?ERROR_UTILS.sanitizeError(this.state.depositopenchannelerror):''}</p>*/}
    </div>
  </TabContainer>
);

const InvokeTab = ({ classes }) => (
  <TabContainer/>
);

const ResultTab = () => (
  <TabContainer>
    {/*{this.state.servicegrpcresponse?
      <p style={{fontSize: "13px"}}>Response from service is {this.state.servicegrpcresponse} </p>:null} {this.state.servicegrpcerror?
    <p style={{fontSize: "13px",color: "red"}}>Response from service is {this.state.servicegrpcerror}</p>:null} {this.state.servicefetcherror?
    <p style={{fontSize: "13px",color: "red"}}>Response from service is {this.state.servicefetcherror}</p>:null}*/}
  </TabContainer>
);

export default connect(
  ({ jobSliderData }) => ({ jobSliderData })
)(withStyles(styles)(ServiceDetails));