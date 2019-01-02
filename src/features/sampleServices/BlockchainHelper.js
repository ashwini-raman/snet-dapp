import Eth from 'ethjs';
import Web3 from 'web3';
import RegistryNetworks from 'singularitynet-platform-contracts/networks/Registry.json';
import RegistryAbi from 'singularitynet-platform-contracts/abi/Registry.json';
import AGITokenNetworks from 'singularitynet-token-contracts/networks/SingularityNetToken.json';
import AGITokenAbi from 'singularitynet-token-contracts/abi/SingularityNetToken.json';
import MPEAbi from 'singularitynet-platform-contracts/abi/MultiPartyEscrow.json';
import MPENetworks from 'singularitynet-platform-contracts/networks/MultiPartyEscrow.json';
import {AGI, NETWORKS} from '../../common/helper/util';

class BlockchainHelper {
  constructor() {
    this.eth = undefined;
    this.web3 = undefined;
    this.chainId = undefined;
  }

  async initialize() {
    let web3Initiatized = false;
    if (typeof window.ethereum !== 'undefined') {
      try {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        this.initializeState();
        web3Initiatized = true;
      } catch (error) {
        console.log('User denied access to Metamask');
      }
    } else if (typeof window.web3 !== 'undefined') {
      this.initializeState();
      web3Initiatized = true;
    }
    return web3Initiatized;
  }

  initializeState() {
    this.web3 = window.web3;
    this.eth = new Eth(window.web3.currentProvider);
    window.ethjs = this.eth; //TODO - NETWORK CHANGE
  }

  async waitForTransaction(hash) {
    let receipt;
    while (!receipt) {
      receipt = await window.ethjs.getTransactionReceipt(hash);
    }

    if (receipt.status === '0x0') {
      throw receipt;
    }

    return receipt;
  }

  getAccount(callBack) {
    if (typeof this.eth === 'undefined') {
      callBack(undefined);
    }

    this.eth.accounts().then(accounts => {
      if (accounts.length === 0) {
        console.log('wallet is locked');
      } else {
        window.web3.eth.defaultAccount = accounts[0]; //TODO - NETWORK CHANGE
        console.log('account: ' + accounts[0] + ' unlocked');
        callBack(accounts[0]);
      }
    }).catch(err => {
      console.log(err);
    });
    callBack(undefined);
  }

  getAGIBalance(chainId, address, callBack) {
    if (typeof this.eth === 'undefined') {
      return callBack(undefined);
    }

    const tokenInstance = this.getTokenInstance(chainId);
    if (typeof tokenInstance !== 'undefined') {
      tokenInstance.balanceOf(address, (err, balance) => {
        callBack(AGI.inAGI(balance));
      });
    }
    return callBack(undefined);
  }

  getEThBalance(callBack) {
    if (typeof this.eth === 'undefined') {
      return callBack(undefined);
    }

    var balance = undefined;
    this.eth.accounts().then(accounts => {
      this.eth.getBalance(accounts[0]).then(response => {
        balance = Number(response.toString());
        console.log('Balance is ' + balance);
        callBack(balance);
      }).catch(err => {
        console.log(err);
      });
    });
    return callBack(undefined);
  }

  async getChainID() {
    if (typeof this.eth === 'undefined') {
      return undefined;
    }

    const chainId = await this.eth.net_version();
    if (this.chainId !== chainId && typeof chainId !== undefined) {
      this.chainId = NETWORKS[chainId] ? chainId : undefined;
    }
    return this.chainId;
  }

  getEtherScanAddressURL(chainId, address) {
    return (chainId in NETWORKS ? NETWORKS[chainId]['etherscan'] + '/address/' + address : undefined);
  }

  getMarketplaceURL(chainId) {
    return (chainId in NETWORKS ? NETWORKS[chainId]['marketplace'] : undefined);
  }

  getProtobufjsURL(chainId) {
    return (chainId in NETWORKS ? NETWORKS[chainId]['protobufjs'] : undefined);
  }

  getRegistryInstance(chainId) {
    if (chainId in RegistryNetworks) {
      const contract = window.web3.eth.contract(RegistryAbi);
      return contract.at(RegistryNetworks[chainId].address);
    }
  }

  getMPEAddress(chainId) {
    return (chainId in MPENetworks) ? MPENetworks[chainId].address : undefined;
  }

  getMPEInstance(chainId) {
    if (chainId in MPENetworks) {
      const contract = new window.web3.eth.Contract(MPEAbi, MPENetworks[chainId].address);
      console.log(contract);
      return contract
    }
    return undefined;
  }

  getTokenAddress(chainId) {
    return (chainId in AGITokenNetworks) ? AGITokenNetworks[chainId].address : undefined;
  }

  getTokenInstance(chainId) {
    if (chainId in AGITokenNetworks) {
      const contract = window.web3.eth.contract(AGITokenAbi);
      return contract.at(AGITokenNetworks[chainId].address);
    }
    return undefined;
  }

  getDefaultNetwork() {
    return Object.keys(NETWORKS).find(key => NETWORKS[key].default || false);
  }
}

export default new BlockchainHelper();
