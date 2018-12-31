import {SERVICE_DATA_FETCHED_ACTION, UPDATE_CHAIN_ID_ACTION} from './serviceActions';

const initialState = {
  services: [],
  serviceStatus: [],
  userVote: [],
  userAddress: undefined,
  chainId: undefined,
  healthMerged: undefined,
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
    default:
      return state;
  }
}