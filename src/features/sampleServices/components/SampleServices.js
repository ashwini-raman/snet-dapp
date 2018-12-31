import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import TableBody from '@material-ui/core/es/TableBody/TableBody';
import Button from '@material-ui/core/Button';
import AgentHealth from './AgentHealth';
import Votes from './Votes';
import {cleanupServiceNetworkCalls, initialiseServiceData} from '../redux/serviceActions';

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
  if (!serviceStatusForService) {
    return null;
  }
  return <AgentHealth healthy={serviceStatusForService.is_available === 1}/>;
};

const getVotes = (userVote, service) => {
  const userVoteForService = userVote.find(element => element.service_name === service.service_name);
  return <Votes votes={userVoteForService}/>;
};

class SampleServices extends React.Component {

  componentWillUnmount() {
    this.props.cleanupServiceNetworkCalls();
  }
  componentDidMount() {
    this.props.initialiseServiceData();
  }

  render() {
    const { classes, userVotes, serviceStatus, services} = this.props;
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
          {services.map((service) =>
            <TableRow key={service.service_id} className={classes.row}>
              <TableCell className={classes.tableCell}>{service.display_name}</TableCell>
              <TableCell className={classes.tableCell}>{service.organization_name}</TableCell>
              <TableCell className={classes.tableCell}>{service.price} AGI</TableCell>
              <TableCell className={classes.tableCell}>{service.tags && service.tags.map(tag =>
                <Button>tag</Button>)}</TableCell>
              <TableCell className={classes.tableCell}>
                {getServiceStatus(serviceStatus, service)}
              </TableCell>
              <TableCell className={classes.tableCell}><Button variant="contained"
                                                               color="primary">Details</Button></TableCell>
              <TableCell className={classes.tableCell}>{getVotes(userVotes, service)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>);
  }
}

const StyledSampleServices = withStyles(styles)(SampleServices);

export default connect(
  ({serviceData}) => ({
    services: serviceData.services,
    serviceStatus: serviceData.serviceStatus,
    userVotes: serviceData.userVote,
  }),
  (dispatch) => ({
    initialiseServiceData: () => dispatch(initialiseServiceData),
    cleanupServiceNetworkCalls: () => dispatch(cleanupServiceNetworkCalls)
  })
)(StyledSampleServices);