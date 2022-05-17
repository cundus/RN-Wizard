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
  console.log(jsonView);
  return (
    <Box flex={1}>
      <WebView
        originWhitelist={['*']}
        source={{html: `<div><pre>${jsonView}</pre></div>`}}
        style={{
          width: 400,
          height: 400,
        }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=1, maximum-scale=1, user-scalable=1.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
      />
      <HStack justifyContent="center" space={5} flex={1}>
        <Button
          w={100}
          // onPress={() => {
          //   dispatch({type: 'RESET'});
          //   navigation.navigate('Welcome');
          // }}
        >
          Done
        </Button>
      </HStack>
    </Box>
  );
};

export default Result;
