import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  BlueText,
  ClickView,
  LeaderboardButton,
  SettingsButton,
  TrophyIcon,
} from '../styled/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Game = ({navigation}) => {
  const [hasPassedPrestige, setHasPassedPrestige] = React.useState(false);
  const prestigeTest = 10;
  const [score, setScore] = React.useState(0);
  const [prestige, setPrestige] = React.useState(0);
  console.log(score);

  useEffect(() => {
    if (score >= prestigeTest) {
      setHasPassedPrestige(true);
    }
  }, [score]);

  function addScore() {
    setScore(score + 1 * ((prestige + 1) * 0.2));
  }

  function addPrestige() {
    setScore(0);
    setPrestige(prestige + 1);
    setHasPassedPrestige(false);
    AsyncStorage.setItem('prestige', prestige.toString());
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <BlueText>
          {score}/{prestigeTest}
        </BlueText>
        <SettingsButton onPress={() => navigation.navigate('Settings')}>
          <TrophyIcon>Settings</TrophyIcon>
        </SettingsButton>
        <LeaderboardButton onPress={() => navigation.navigate('Leaderboard')}>
          <TrophyIcon>Leaderboard</TrophyIcon>
        </LeaderboardButton>
        {hasPassedPrestige ? <Button title="test" onPress={addPrestige} /> : ''}
      </ClickView>
    </SafeAreaView>
  );
};
export default Game;
