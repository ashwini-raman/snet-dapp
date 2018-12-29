import React from 'react';
import {withStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import TableBody from '@material-ui/core/es/TableBody/TableBody';
import Button from '@material-ui/core/Button';
import AgentHealth from './AgentHealth';
import Votes from './Votes';

const styles = {
  tableContainer: {
    marginLeft: '12px',
    width: '97%',
  },
  table: {
    margin: '0 10px 0 10px',
    borderSpacing: '0 15px',
    borderCollapse: 'separate',
  },
  row: {
    boxShadow: '0px 0px 8px #bcd7ff',
    padding: '5px 8px',
    marginBottom: '10px',
    borderRadius: '6px',
  },
  tableCell: {
    border: '0',
  }
};


const getServiceStatus = (serviceStatus, service) => {
  const serviceStatusForService = serviceStatus.find(element => element.service_id === service.service_id);
  if(!serviceStatusForService) {
    return null;
  }
  return <AgentHealth healthy={serviceStatusForService.is_available === 1}/>;
};

const getVotes = (userVote, service) => {
  const userVoteForService = userVote.find(element => element.service_name === service.service_name);
  return <Votes votes={userVoteForService}/>;
};

class SampleServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: new Array(10).fill({
        service_id: 1,
        display_name: 'cntk-image-recon',
        organization_name: 'snet',
        price: '1.00000000',
        tags: [],
        service_name: 'cntk-service'

      }),
      serviceStatus: [{
        service_id: 1,
        is_available: 1,
      }],
      userVote: [{
        service_name: 'cntk-service',
        up_vote_count: 3,
        down_vote_count: 1,
      }]
    };
  }

  componentDidMount() {
  }

  render() {
    const {classes} = this.props;
    return (<div className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Agent</TableCell>
            <TableCell className={classes.tableCell}>Organization</TableCell>
            <TableCell className={classes.tableCell}>Price</TableCell>
            <TableCell className={classes.tableCell}>Tags</TableCell>
            <TableCell className={classes.tableCell}>Health</TableCell>
            <TableCell className={classes.tableCell}>Action</TableCell>
            <TableCell className={classes.tableCell}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.services.map((service) =>
            <TableRow key={service.service_id} className={classes.row}>
              <TableCell className={classes.tableCell}>{service.display_name}</TableCell>
              <TableCell className={classes.tableCell}>{service.organization_name}</TableCell>
              <TableCell className={classes.tableCell}>{service.price} AGI</TableCell>
              <TableCell className={classes.tableCell}>{service.tags && service.tags.map(tag => <Button>tag</Button>)}</TableCell>
              <TableCell className={classes.tableCell}>
                {getServiceStatus(this.state.serviceStatus, service)}
              </TableCell>
              <TableCell className={classes.tableCell}><Button variant="contained" color="primary">Details</Button></TableCell>
              <TableCell className={classes.tableCell}>{getVotes(this.state.userVote, service)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>);
  }
}

export default withStyles(styles)(SampleServices);