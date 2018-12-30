import React from 'react';
import Header from './Header';
import {Route} from 'react-router-dom';

const WalletConnectedLayout = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <React.Fragment>
      <Header/>
      <Component {...matchProps} />
    </React.Fragment>
  )}/>
);

export default WalletConnectedLayout;