import React from 'react';
import YouTube from 'react-youtube';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  container: {
    position: 'relative',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
  },
  text: {
    margin: '40px 0 15px 0',
    textAlign: 'center',
  },
  video: {
    textAlign: 'center',
    width: '100%',
  }
};

const opts = {
  height: '286',
  width: '640',
  playerVars: {
    autoplay: 0
  }
};

const SingularityVideo = ({classes}) =>  (
  <div className={classes.container}>
    <div className={classes.text}>WELCOME TO SINGULARITYNET</div>
    <div className={classes.video} >
      <YouTube videoId="RvXoZ9qAo-o" opts={opts} />
    </div>
  </div>
);

export default withStyles(styles)(SingularityVideo);