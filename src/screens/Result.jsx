import {Box, Button, HStack, Text} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import {WizardContext} from '../context/WizardContext';
import {globalStyle} from '../globalStyle/globalStyle';

const Result = ({navigation}) => {
  const wizardContext = React.useContext(WizardContext);
  const {state, dispatch} = wizardContext;
  const jsonView = JSON.stringify(state.data, null, 2);
  return (
    <Box {...globalStyle.container}>
      <Text fontSize="2xl" textAlign="center" fontWeight="bold">
        Result
      </Text>
      <WebView
        originWhitelist={['*']}
        source={{html: `<div><pre>${jsonView}</pre></div>`}}
      />
      <HStack justifyContent="center" space={5}>
        <Button w={100} onPress={() => navigation.navigate('Welcome')}>
          Done
        </Button>
      </HStack>
    </Box>
  );
};

export default Result;
