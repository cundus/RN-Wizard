import React, {useReducer, createContext} from 'react';
import {Biodata, PhotoUpload, Result} from '../screens/Wizard';

export const WizardContext = createContext();

const initialState = {
  currentStep: 0,
  steps: [
    {
      title: 'Biodata',
      component: () => <Biodata />,
      key: 'biodata',
      icon: 'idcard',
    },
    {
      title: 'Photo Upload',
      component: () => <PhotoUpload />,
      key: 'photoUpload',
      icon: 'camerao',
    },
    {
      title: 'Result',
      component: () => <Result />,
      key: 'result',
      icon: 'check',
    },
  ],
  captureMode: false,
  data: {
    firstName: '',
    lastName: '',
    biodata: '',
    provinsi: '',
    kota_kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    selfie: {},
    ktp: {},
    bebas: {},
    no_ktp: '',
  },
};

//reducer for wizard
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_STEP':
      if (state.currentStep < state.steps.length - 1) {
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      }
      return state;
    case 'PREV_STEP':
      if (state.currentStep > 0) {
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      }
      return state;

    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_CAPTURE_MODE':
      return {
        ...state,
        captureMode: action.payload,
      };
    case 'SET_DATA':
      const newData = {
        ...state.data,
        ...action.payload,
      };
      return {
        ...state,
        data: newData,
      };

    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// make provider for wizard
export const WizardProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WizardContext.Provider value={{state, dispatch}}>
      {children}
    </WizardContext.Provider>
  );
};
