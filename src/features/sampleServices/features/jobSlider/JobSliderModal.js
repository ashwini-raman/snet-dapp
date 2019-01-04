import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Slide, Typography} from '@material-ui/core/index';
import {withStyles} from '@material-ui/core/styles/index';
import {CLOSE_JOB_SLIDER, startJob} from './redux/jobSliderActions';
import CloseButton from './CloseButton';
import ServiceDetailsTab from './ServiceDetailsTabs';

const styles = {
  modal: {
    zIndex: '1000',
  },
  sideBar: {
    position: 'absolute',
    background: 'white',
    borderRadius: '3px',
    border: '5px',
    color: 'white',
    height: '100%',
    width: '550px',
    padding: '0px 10px',
    boxShadow: 'grey 0px 3px 5px 2px',
    right: '0px',
    top: '0px',
  },
  serviceName: {
    padding: '15px 0',
    //font-size: 16px;
  },
  startJobButtonContainer: {
    borderTop: '1px solid #e4e4e4',
    padding: '15px 0',
  },
  button: {
    color: '#fff',
    backgroundColor: '#0066ff',
    border: '0px',
    borderRadius: '50px',
    padding: '7px 14px',
    fontSize: '14px',
    backgroundImage: 'linear-gradient(90deg, #69c5f9, #5551eb)',
    width: '100%',
  },
};

const ServiceName = ({classes, jobSliderData})  => (
  <div className={classes.serviceName}>
    <Typography variant='subtitle1' color='primary'>
      {jobSliderData.service.service_name}
    </Typography>
    <p>
      {jobSliderData.service.tags && jobSliderData.service.tags.map(rowtags =>
        <button type="button">{rowtags}</button>)
      }
    </p>
  </div>
);

const StartJobButton = ({classes, jobSliderData, startJob}) => (
  <div className={classes.startJobButtonContainer}>
    {jobSliderData.service.healthy ?
      <Button variant='contained' color='primary' className={classes.button}
              onClick={startJob}>Start Job</Button> :
      <Button variant='contained' disabled>Start Job</Button>
    }
  </div>
);

const JobSliderModal = (props) => {
  const { classes, jobSliderData, closeJobSlider } = props;
  return (<Modal open={jobSliderData.jobDetailsSliderOpen} className={classes.modal}>
    <Slide direction="left" in={jobSliderData.jobDetailsSliderOpen} mountOnEnter unmountOnExit>
      <div className={classes.sideBar}>
        <CloseButton onClickAction={closeJobSlider}/>
        <ServiceName {...props} />
        <StartJobButton {...props}/>
        <ServiceDetailsTab />
      </div>
    </Slide>
  </Modal>)
};

export default connect(
  ({ jobSliderData }) => ({ jobSliderData }),
  (dispatch) => ({
    closeJobSlider: () => dispatch({ type: CLOSE_JOB_SLIDER }),
    startJob: () => dispatch(startJob)
  })
)(withStyles(styles)(JobSliderModal));