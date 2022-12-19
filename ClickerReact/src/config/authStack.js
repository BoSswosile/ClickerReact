import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Leaderboard from '../views/leaderboard';
import Game from '../views/game';
import Settings from '../views/settings';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Game" component={Game} options={{title: 'Game'}} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{title: 'Leaderboard'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
