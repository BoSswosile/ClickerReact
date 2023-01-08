import React from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { SettingsButton, LeaderboardButton, FullView } from './style';

export default MenuIcons = ({navigation}) => {
  return (
    <FullView>
      <SettingsButton onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={40} color="#868b8b"></Ionicons>
      </SettingsButton>
      <LeaderboardButton onPress={() => navigation.navigate('Leaderboard')}>
        <EntypoIcon name="trophy" size={40} color="#868b8b"></EntypoIcon>
      </LeaderboardButton>
    </FullView>
  );
};
