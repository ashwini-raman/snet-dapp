import React from 'react';
import './BrowserReset.css';
import WalletConnectedLayout from './WalletConnectedLayout';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Providers from '../../features/providerSelection/Providers';
import LandingPage from './Landing';
import Services from '../../features/sampleServices/Services';

export const Routes = {
  home: '/',
  providers: '/providers',
  services: '/services',
  connectWallet: '/connectWallet',
};

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={Routes.home} component={LandingPage} exact />
          <Route path={Routes.providers} component={Providers} />
          <WalletConnectedLayout path={Routes.services} component={Services}/>
        </Switch>
      </BrowserRouter>
    );
  }

}
