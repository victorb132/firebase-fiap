import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {

  function LoginScreens() {
    return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Login} />
      </Stack.Navigator>
    )
  }

  function LoggedScreens() {
    return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <LoginScreens />
    </NavigationContainer>
  );
}