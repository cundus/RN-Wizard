import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import * as React from 'react';
import {WizardProvider} from './src/context/WizardContext';
import Route from './src/routes/Route';

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      200: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      300: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      400: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      500: {
        normal: 'Montserrat-Medium',
      },
      600: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
    },
  },

  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
    mono: 'Montserrat',
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <WizardProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </WizardProvider>
    </NativeBaseProvider>
  );
}
