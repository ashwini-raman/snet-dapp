import network from '../BlockchainHelper';
import Request, {CORS_HEADER} from '../../../common/helper/Request';

export const UPDATE_CHAIN_ID_ACTION = 'Service/UPDATE_CHAIN_ID_ACTION';
export const SERVICE_DATA_FETCHED_ACTION = 'Service/SERVICE_DATA_FETCHED_ACTION';
export const SERVICE_SORT_ACTION = 'Service/SERVICE_SORT_ACTION';
export const SERVICE_SORT_BY = {
  AGENT: 'display_name',
  PRICE: 'price',
  HEALTH: 'health'
};

export const serviceNameSortAction = () => ({
  type: SERVICE_SORT_ACTION,
  payload: {
    sortBy: SERVICE_SORT_BY.AGENT
  }
});

export const priceSortAction = () => ({
  type: SERVICE_SORT_ACTION,
  payload: {
    sortBy: SERVICE_SORT_BY.PRICE
  }
});

export const healthSortAction = () => ({
  type: SERVICE_SORT_ACTION,
  payload: {
    sortBy: SERVICE_SORT_BY.HEALTH
  }
});


let watchNetworkTimer = undefined;

export const initialiseServiceData = async (dispatch, getState) => {
  const isInitialized = await network.initialize();
  try {
    if (isInitialized) {
      //TODO: needs to be 500ms as if the network changes it has to be notified asap
      watchNetworkTimer = setInterval(() => watchNetwork(dispatch, getState), 5000);
    } else {
      const defaultChainID = network.getDefaultNetwork();
      await setChainIdAndLoadDetails(dispatch, defaultChainID);
    }
  } catch (error) {
    console.error(error);
  }
};

const setChainIdAndLoadDetails = async (dispatch, chainId) => {
  dispatch({ type: UPDATE_CHAIN_ID_ACTION, payload: { chainId: chainId } });
  console.log('Defaulting to ' + chainId);
  const [services, serviceStatus, { userVote, userAddress }] = await Promise.all([
    getServiceDetails(chainId),
    getServiceStatus(chainId),
    getUserVote(chainId)]);
  dispatch({
    type: SERVICE_DATA_FETCHED_ACTION, payload: {
      services,
      serviceStatus,
      userVote,
      userAddress,
      healthMerged: false
    }
  });
};

export const cleanupServiceNetworkCalls = () => {
  if (watchNetworkTimer) {
    clearInterval(watchNetworkTimer);
  }
};

const watchNetwork = async (dispatch, getState) => {
  const chainId = await network.getChainID();
  if (chainId !== getState().serviceData.chainId) {
    await setChainIdAndLoadDetails(dispatch, chainId);
  }
};

//TODO: do a healthsort on the agents data
const getServiceDetails = async (chainId) => {
  const serviceURL = network.getMarketplaceURL(chainId) + 'service';
  return await new Request(serviceURL).get();
};

const getServiceStatus = async (chainId) => {
  const serviceStatusUrl = network.getMarketplaceURL(chainId) + 'group-info';
  return await new Request(serviceStatusUrl).get();
};

const getUserVote = async (chainId) => {
  if (typeof window.web3 === 'undefined') {
    return;
  }
  const userAddress = window.web3.eth.coinbase;
  const fetchVoteUrl = network.getMarketplaceURL(chainId) + 'fetch-vote';
  const userVote = await new Request(fetchVoteUrl).post({ user_address: userAddress }, CORS_HEADER);
  return {
    userVote, userAddress,
  };
};

