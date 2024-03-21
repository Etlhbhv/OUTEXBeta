import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './pages/sign_up';
import SignIn from './pages/sign_in';
import EmailPR from './pages/reset/email_pr';
import Profile from './pages/Profile';
import ProfileE from './pages/ProfileE';
import MainP from './pages/MainP';
import Training from './pages/Training';
import Exercise from './pages/Exercise';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="EmailPR" component={EmailPR} options={{ headerShown: false }} />
      <Stack.Screen name="MainP" component={MainP} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileE" component={ProfileE} options={{ headerShown: false }} />
      <Stack.Screen name="Training" component={Training} options={{ headerShown: false }} />
      <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}