import {
  SERVICE_DATA_FETCHED_ACTION,
  SERVICE_SORT_ACTION,
  SERVICE_SORT_BY,
  UPDATE_CHAIN_ID_ACTION
} from './serviceActions';

const initialState = {
  services: [],
  userAddress: undefined,
  chainId: undefined,
  //TODO: where is this used?
  healthMerged: undefined,
  sortBy: undefined,
  sortAscending: true,
};

export const ServiceHealthStatus = {
  UNHEALTHY: -1,
  HEALTHY: 1,
};

const mergeServicesStatusAndVotes = (services, serviceStatus, userVote) => {
  return services.map(service => {
    const serviceStatusForService = serviceStatus
      .find(element => element.service_id === service.service_id) || {is_available: ServiceHealthStatus.UNHEALTHY};
    const userVoteForService = userVote
      .find(element => (element.service_name === service.service_name)) || {up_vote_count: 0, down_vote_count: 0};
    return {
      ...service,
      healthy: serviceStatusForService.is_available === ServiceHealthStatus.HEALTHY,
      votes: userVoteForService
    }
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAIN_ID_ACTION:
      return { ...state, chainId: action.payload.chainId };
    case SERVICE_DATA_FETCHED_ACTION:
      return {
        ...state,
        services: mergeServicesStatusAndVotes(action.payload.services,
          action.payload.serviceStatus,
          action.payload.userVote),
        userAddress: action.payload.userAddress,
        healthMerged: action.payload.healthMerged,
      };
    case SERVICE_SORT_ACTION:
      const sortOrder = (state.sortBy === action.payload.sortBy) ? !state.sortAscending : true;
      const sortedServices = [...state.services].sort(
        createComparator(action.payload.sortBy, sortOrder)
      );
      return { ...state, services: sortedServices, sortBy: action.payload.sortBy, sortAscending: sortOrder };
    default:
      return state;
  }
};

function createComparator(property, sortAscending) {
  return function (a, b) {
    if (property === SERVICE_SORT_BY.AGENT) {
      return sortAscending ? a[property].localeCompare(b[property]) : b[property].localeCompare(a[property]);
    }
    else {
      return sortAscending ? a[property] - b[property] : b[property] - a[property];
    }
  };
}