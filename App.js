import React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import {getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}