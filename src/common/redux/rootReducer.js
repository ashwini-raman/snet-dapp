import {combineReducers} from 'redux';
import accountData from './accountDataReducer';
import serviceData from '../../features/sampleServices/redux/servicesReducer';
import jobSliderData from '../../features/sampleServices/features/jobSlider/redux/jobSliderReducer';

const rootReducer = combineReducers({
  accountData,
  serviceData,
  jobSliderData,
});

export default rootReducer;