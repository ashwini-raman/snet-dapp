import {
  SERVICE_DATA_FETCHED_ACTION,
  SERVICE_SORT_ACTION,
  SERVICE_SORT_BY,
  UPDATE_CHAIN_ID_ACTION
} from './serviceActions';

const initialState = {
  services: [],
  serviceStatus: [],
  userVote: [],
  userAddress: undefined,
  chainId: undefined,
  healthMerged: undefined,
  sortBy: undefined,
  sortAscending: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CHAIN_ID_ACTION:
      return { ...state, chainId: action.payload.chainId };
    case SERVICE_DATA_FETCHED_ACTION:
      return {
        ...state, services: action.payload.agents || [],
        serviceStatus: action.payload.serviceStatus || [],
        userVote: action.payload.userVote || [],
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