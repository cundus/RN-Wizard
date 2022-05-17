import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Wizard from '../components/Wizard';

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
      <Stack.Screen name="Wizard" component={Wizard} />
    </Stack.Navigator>
  );
};

export default Route;
