import {combineReducers} from 'redux';
import accountData from './accountDataReducer';
import serviceData from '../../features/sampleServices/redux/servicesReducer';

const rootReducer = combineReducers({
  accountData,
  serviceData,
});

export default rootReducer;