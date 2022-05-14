import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Biodata from '../screens/Biodata';
import Header from './Header';
import {WizardContext} from '../context/WizardContext';

const Wizard = () => {
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const {currentStep, steps} = state;

  const nextStep = () => {
    dispatch({type: 'NEXT_STEP'});
  };

  const prevStep = () => {
    dispatch({type: 'PREV_STEP'});
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      {steps.map(
        (screen, index) =>
          index === currentStep && (
            <View key={index} style={{flex: 1}}>
              {screen.content}
            </View>
          ),
      )}
    </View>
  );
};

export default Wizard;
