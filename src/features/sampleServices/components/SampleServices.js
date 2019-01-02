import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import AgentHealth from './AgentHealth';
import Votes from './Votes';
import {
  cleanupServiceNetworkCalls,
  healthSortAction,
  initialiseServiceData,
  priceSortAction,
  serviceNameSortAction
} from '../redux/serviceActions';
import toggle from '../../../common/images/Arrow.png';
import {OPEN_JOB_SLIDER} from '../features/jobSlider/redux/jobSliderActions';
import JobSliderModal from '../features/jobSlider/JobSliderModal';

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
  headerCell: {
    border: '0',
    fontSize: '16px',
    color: 'black',
  },
  toggleButton: {
    minWidth: '0',
  },
  tableCell: {
    border: '0',
    fontSize: '14px',
    color: 'black',
  },
  pagination: {
    color: 'black',
  },
};

const getServiceStatus = (serviceStatus, service) => {
  const serviceStatusForService = serviceStatus.find(element => element.service_id === service.service_id);
  if (!serviceStatusForService) {
    return null;
  }
  return serviceStatusForService.is_available === 1;
};

const getVotes = (userVote, service) => {
  const userVoteForService = userVote.find(element => element.service_name === service.service_name);
  return <Votes votes={userVoteForService}/>;
};

const toggleButton = (classes, action) => (
  <Button className={classes.toggleButton}>
    <img src={toggle} alt="toggle" onClick={action}/>
  </Button>
);

class SampleServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentWillUnmount() {
    this.props.cleanupServiceNetworkCalls();
  }

  componentDidMount() {
    this.props.initialiseServiceData();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      classes, userVotes, serviceStatus, services,
      serviceNameSortAction, priceSortAction, healthSortAction, openJobSlider
    } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <div>
        <div className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>
                  Agent {toggleButton(classes, serviceNameSortAction)}
                </TableCell>
                <TableCell className={classes.headerCell}>Organization</TableCell>
                <TableCell className={classes.headerCell}>
                  Price {toggleButton(classes, priceSortAction)}
                </TableCell>
                <TableCell className={classes.headerCell}>Tags</TableCell>
                <TableCell className={classes.headerCell}>
                  Health {toggleButton(classes, healthSortAction)}
                </TableCell>
                <TableCell className={classes.headerCell}>Action</TableCell>
                <TableCell className={classes.headerCell}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((service) =>
                <TableRow key={service.service_id} className={classes.row}>
                  <TableCell className={classes.tableCell}>{service.display_name}</TableCell>
                  <TableCell className={classes.tableCell}>{service.organization_name}</TableCell>
                  <TableCell className={classes.tableCell}>{service.price} AGI</TableCell>
                  <TableCell className={classes.tableCell}>{service.tags && service.tags.map(tag =>
                    <Button>tag</Button>)}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <AgentHealth healthy={getServiceStatus(serviceStatus, service)}/>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Button variant="contained" color="primary"
                            onClick={() => openJobSlider(service, getServiceStatus(serviceStatus, service))}>
                      Details
                    </Button></TableCell>
                  <TableCell className={classes.tableCell}>{getVotes(userVotes, service)}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination className={classes.pagination}
                           rowsPerPageOptions={[]}
                           component="div"
                           count={services.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           backIconButtonProps={{
                             'aria-label': 'Previous Page',
                           }}
                           nextIconButtonProps={{
                             'aria-label': 'Next Page',
                           }}
                           onChangePage={this.handleChangePage}
          />
        </div>
        <JobSliderModal/>
      </div>
    );
  }
}

const StyledSampleServices = withStyles(styles)(SampleServices);

export default connect(
  ({ serviceData }) => ({
    services: serviceData.services,
    serviceStatus: serviceData.serviceStatus,
    userVotes: serviceData.userVote,
    offset: serviceData.offset,
  }),
  (dispatch) => ({
    initialiseServiceData: () => dispatch(initialiseServiceData),
    cleanupServiceNetworkCalls: () => dispatch(cleanupServiceNetworkCalls),
    serviceNameSortAction: () => dispatch(serviceNameSortAction()),
    priceSortAction: () => dispatch(priceSortAction()),
    healthSortAction: () => dispatch(healthSortAction()),
    openJobSlider: (service, healthy) => dispatch({
      type: OPEN_JOB_SLIDER,
      payload: {
        service,
        healthy,
      }
    })
  })
)(StyledSampleServices);