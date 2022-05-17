import {Box, Button, HStack, Text} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import {WizardContext} from '../../context/WizardContext';
import {globalStyle} from '../../globalStyle/globalStyle';
import {useNavigation} from '@react-navigation/native';
const Result = () => {
  const navigation = useNavigation();
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const jsonView = JSON.stringify(state.data, null, 2);
  return (
    <Box {...globalStyle.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: `<div><pre>${jsonView}</pre></div>`}}
      />
      <HStack justifyContent="center" space={5}>
        <Button
          w={100}
          onPress={() => {
            dispatch({type: 'RESET'});
            navigation.navigate('Welcome');
          }}>
          Done
        </Button>
      </HStack>
    </Box>
  );
};

export default Result;
