import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Biodata from '../screens/Biodata';
import PhotoUpload from '../screens/PhotoUpload';
import Welcome from '../screens/Welcome';
import Result from '../screens/Result';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Biodata" component={Biodata} />
      <Stack.Screen name="Upload" component={PhotoUpload} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

export default Route;
