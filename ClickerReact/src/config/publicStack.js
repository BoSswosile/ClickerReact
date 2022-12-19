import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/login';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Game from '../views/game';
import AuthStack from './authStack';
const Stack = createNativeStackNavigator();

const PublicStack = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      console.log(loading);
      if (token) {
        setLoading(false);
        navigation.navigate('Auth', {screen: 'Game'});
      }
    });
  });

  if (loading) {
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
    </Stack.Navigator>
  );
};

export default PublicStack;
