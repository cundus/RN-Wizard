import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Biodata from '../screens/Biodata';
import PhotoUpload from '../screens/PhotoUpload';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Biodata"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Biodata" component={Biodata} />
      <Stack.Screen name="Upload" component={PhotoUpload} />
    </Stack.Navigator>
  );
};

export default Route;
