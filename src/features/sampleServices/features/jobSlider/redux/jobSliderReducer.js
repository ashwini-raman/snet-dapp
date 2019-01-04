import {CLOSE_JOB_SLIDER, JOB_STARTED, OPEN_JOB_SLIDER} from './jobSliderActions';

const initialState = {
  jobDetailsSliderOpen: false,
  service: {},
  healthy: false,
  startJobFundInvokers: false,
  openChaining: false,
  valueTab: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_JOB_SLIDER:
      return { ...state,
        jobDetailsSliderOpen: true,
        service: action.payload.service,
      };
    case CLOSE_JOB_SLIDER:
      return { ...initialState };
    case JOB_STARTED:
      return { ...state,
        startJobFundInvokers: action.payload.startJobFundInvokers,
        valueTab: action.payload.valueTab
      };
    default:
      return state;
  }
}