import {createStackNavigator} from '@react-navigation/stack';
import Result from '../screens/Result';
import Step1 from '../screens/Step1';
import Step2 from '../screens/Step2';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

function Route() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Step1" component={Step1} />
      <Stack.Screen name="Step2" component={Step2} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}

export default Route;
