import React from 'react';
import YouTube from 'react-youtube';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  container: {
    width: '60%',
    margin: '0 auto',
  },
  text: {
    margin: '40px 0 15px 0',
    textAlign: 'center',
  },
  videoContainer: {
    position: 'relative',
    width: '86%',
    margin: '0 auto',
    height: '0',
    paddingBottom: '43.25%',
  },
  video: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  }
};

const SingularityVideo = ({classes}) =>  (
  <div className={classes.container}>
    <div className={classes.text}>WELCOME TO SINGULARITYNET</div>
    <div className={classes.videoContainer}>
      <YouTube videoId="RvXoZ9qAo-o" className={classes.video}/>
    </div>
  </div>
);

export default withStyles(styles)(SingularityVideo);