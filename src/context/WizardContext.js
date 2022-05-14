import React, {useReducer, createContext} from 'react';
import Biodata from '../screens/Biodata';
import PhotoUpload from '../screens/PhotoUpload';
import Result from '../screens/Result';

export const WizardContext = createContext();

const initialState = {
  currentStep: 0,
  steps: [
    {
      title: 'Biodata',
      content: <Biodata />,
    },
    {
      title: 'Upload Photo',
      content: <PhotoUpload />,
    },
    {
      title: 'Result',
      content: <Result />,
    },
  ],
  data: {
    firstName: '',
    lastName: '',
    biodata: '',
    provinsi: '',
    kota: '',
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

    case 'SET_DATA':
      const newData = {
        ...state.data,
        ...action.payload,
      };
      return {
        ...state,
        data: newData,
      };
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
