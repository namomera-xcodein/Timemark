import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { PhotoModeScreen } from './src/screens/PhotoModeScreen';
import { PhotoStudioScreen } from './src/screens/PhotoStudioScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0f172a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Timestamp Documentation Camera' }} />
        <Stack.Screen name="PhotoMode" component={PhotoModeScreen} options={{ title: 'Photo Mode' }} />
        <Stack.Screen name="PhotoStudio" component={PhotoStudioScreen} options={{ title: 'Photo Studio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
