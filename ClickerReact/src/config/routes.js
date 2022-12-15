import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/login';
import Game from '../views/game';
import Leaderboard from '../components/leaderboard';

const Stack = createNativeStackNavigator();

//Création du router
const Routes = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Connexion'}}
      />
        <Stack.Screen name="Game" component={Game} options={{title: 'Game'}} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} options={{title: 'Leaderboard'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
