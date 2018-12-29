import React from 'react';
import Header from './Header';
import {Redirect, Route} from 'react-router-dom';
import {Routes} from './App';

const WalletConnectedLayout = ({ component: Component, ...rest }) => (
  (typeof web3 === 'undefined') ?
    <Redirect to={Routes.providers}/> :
    <Route {...rest} render={(matchProps) => (
      <React.Fragment>
        <Header/>
        <Component {...matchProps} />
      </React.Fragment>
    )}/>
);

export default WalletConnectedLayout;