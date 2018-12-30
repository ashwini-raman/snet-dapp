import React from 'react';
import upVoteImage from '../images/thumbs-up.png';
import downVoteImage from '../images/thumbs-down.png';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  container: {
    display: 'flex',
  },
  upVoteDiv: {
    width: '40%',
  },
  downVoteDiv:{
    width: '40%',
    paddingTop: '10px',
  },
  upVoteCount: {
    paddingTop: '14px',
    paddingLeft: '14px',
  },
  downVoteCount: {
    paddingTop: '3px',
    paddingLeft: '13px',
  }
};

const Votes = ({ classes, votes }) => (
  <div className={classes.container}>
    <div className={classes.upVoteDiv}>
      <img src={upVoteImage} alt="Up Vote"/>
      <div className={classes.upVoteCount}>
        {votes.up_vote_count}
      </div>
    </div>
    <div className={classes.downVoteDiv}>
      <img src={downVoteImage} alt="Down Vote"/>
      <div className={classes.downVoteCount}>
        {votes.down_vote_count}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Votes);


