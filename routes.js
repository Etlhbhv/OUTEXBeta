import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import EmailPR from './pages/reset/email_pr';
import CodePR from './pages/reset/code_pr';
import Reset from './pages/reset/reset';
import Exercise from './pages/Exercise';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="EmailPR" component={EmailPR} options={{ headerShown: false }} />
      <Stack.Screen name="CodePR" component={CodePR} options={{ headerShown: false }} />
      <Stack.Screen name="Reset" component={Reset} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}