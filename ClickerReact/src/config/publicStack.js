import React, {useEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from '../components/Login-Register/register';
import Login from '../components/Login-Register/login';
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};

export default PublicStack;
