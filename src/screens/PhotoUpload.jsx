import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WizardContext} from '../context/WizardContext';

const PhotoUpload = () => {
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  console.log(state.data);

  return (
    <View>
      <Text>PhotoUpload</Text>
    </View>
  );
};

export default PhotoUpload;

const styles = StyleSheet.create({});
