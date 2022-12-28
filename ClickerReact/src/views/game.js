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
import axios from 'axios';
import GamePrestiges from '../files/prestige.json';

const Game = ({navigation}) => {
  let id = '63ac211bd72e2daa86cfe4c8';
  const [hasPassedPrestige, setHasPassedPrestige] = React.useState(false);
  const prestigeTest = 10;
  const [score, setScore] = React.useState(0);
  const [prestige, setPrestige] = React.useState(0);
  useEffect(() => {
    if (score >= GamePrestiges.levels[prestige].cost) {
      setHasPassedPrestige(true);
    }
  }, [score]);

  useEffect(() => {
    // console.log(AsyncStorage.getItem('userid'));

    axios({
      method: 'get',
      url: `http://10.0.2.2:3001/api/v1/auth/user/${id}`,
    })
      .then(res => {
        console.log(res.data.prestige);
        setPrestige(res.data.prestige);
        AsyncStorage.setItem('prestige', prestige.toString());
      })
      .catch(err => {
        console.log(err);
      });
    /*  console.log(res.data);
          setUserinfo(Userinfo, ...res.data)
          console.log(Userinfo);*/
  }, []);
  function addScore() {
    setScore(score + 1 * ((prestige + 1) * 0.2));
  }

  function addPrestige() {
    setScore(0);
    setPrestige(prestige + 1);
   
    setHasPassedPrestige(false);
    AsyncStorage.setItem('prestige', prestige.toString());
    console.log(prestige);
    axios({
      method: 'put',
      url: `http://10.0.2.2:3001/api/v1/auth/${id}`,
      data: {
        prestige: prestige,
      },
    })
      .then(res => {
        console.log(res.data.prestige);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <BlueText>
          {score}/{GamePrestiges.levels[prestige].cost}
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
