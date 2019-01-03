import channelHelper from '../../../ChannelHelper';
import network from '../../../BlockchainHelper';
import { Root } from 'protobufjs';
import {AGI} from '../../../../../common/helper/util';

export const OPEN_JOB_SLIDER = 'Slider/OPEN_JOB_SLIDER';
export const CLOSE_JOB_SLIDER = 'Slider/CLOSE_JOB_SLIDER';
export const JOB_STARTED = 'Slider/JOB_STARTED';

const jobStartedAction = (startJobFundInvokers, valueTab) => ({
  type: JOB_STARTED,
  payload: {
    startJobFundInvokers,
    valueTab
  }
});

export const startJob = async (dispatch, getState) => {
  const state = getState();
  const selectedService = state.jobSliderData.service;
  const serviceData = state.serviceData;

  await Promise.all([
    reinitialiseJobState(serviceData, selectedService),
    fetchServiceSpec(selectedService)
  ]);

  getBalanceInformation(dispatch, serviceData, selectedService);
};

const getCurrentBlockNumber = async () => {
  let currentBlockNumber = 900000;
  await window.web3.eth.getBlockNumber((error, result) => {
    if (!error) {
      currentBlockNumber = result;
    }
  });
  return currentBlockNumber;
};

const reinitialiseJobState = async (serviceData, selectedService) => {
  const channelInfoUrl = network.getMarketplaceURL(serviceData.chainId) + 'channel-info';
  await channelHelper.reInitialize(channelInfoUrl, serviceData.userAddress,
    selectedService.service_id, selectedService.org_id);
};

const fetchServiceSpec = async (serviceData, selectedService) => {
  let _urlservicebuf = network.getProtobufjsURL(serviceData.chainId)
    + selectedService.org_id + "/" + selectedService.service_idfier;
  const serviceSpec = await new Request(encodeURI(_urlservicebuf)).get();
  const serviceSpecJSON = Root.fromJSON(serviceSpec[0]);
  //TODO: set this in state as it is used elsewhere. need to know more about state to design it
};

const getBalanceInformation = (dispatch, serviceData, selectedService) => {
  const mpeTokenInstance = network.getMPEInstance(serviceData.chainId);
  const ethBalance = await mpeTokenInstance.methods.balances(serviceData.userAddress);
  const balance = AGI.inAGI(ethBalance);
  console.log("In start job Balance is " + balance + " job cost is " + selectedService.price);
  let foundChannel = channelHelper.findChannelWithBalance(selectedService, getCurrentBlockNumber());

  if (typeof balance !== 'undefined' && balance === 0 && !foundChannel) {
    //this.onOpenModalAlert();
  } else if (foundChannel) {
    dispatch(jobStartedAction(true, 1));
  } else {
    console.log("MPE has balance but no usable channel - Balance is " + balance + " job cost is " + selectedService.price);
    dispatch(jobStartedAction(true, 0));
  }

};