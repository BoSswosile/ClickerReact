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
} from '../../styled/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GamePrestiges from '../../files/prestige.json';
import items from '../../files/items.json';

const Game = ({navigation}) => {
  let id = '63ac211bd72e2daa86cfe4c8';
  const [isClicked, setIsClicked] = React.useState(false);
  const [hasPassedPrestige, setHasPassedPrestige] = React.useState(false);
  const [hasPassedItem, setHasPassedItem] = React.useState(false);
  const [itemLevel, setItemLevel] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [prestige, setPrestige] = React.useState(0);

  useEffect(() => {
    if (isClicked) {
      AsyncStorage.setItem('prestige', prestige.toString());
      console.log(prestige);
      AsyncStorage.getItem('userid').then(resid => {
        axios({
          method: 'put',
          url: `http://10.0.2.2:3001/api/v1/auth/${resid}`,
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
      });
    }
  }, [isClicked, prestige]);

  useEffect(() => {
    if (score >= GamePrestiges.levels[prestige].cost) {
      console.log('can buy prestige');
      setHasPassedPrestige(true);
    } else {
      setHasPassedPrestige(false);
    }
    if (score >= items.items[itemLevel + 1].cost) {
      console.log('can buy item');
      setHasPassedItem(true);
    } else {
      setHasPassedItem(false);
    }
  }, [itemLevel, prestige, score]);

  useEffect(() => {
    // console.log(AsyncStorage.getItem('userid'));
    AsyncStorage.getItem('userid').then(resid => {
      axios({
        method: 'get',
        url: `http://10.0.2.2:3001/api/v1/auth/user/${resid}`,
      })
        .then(res => {
          setPrestige(res.data.prestige);
          AsyncStorage.setItem('prestige', prestige.toString());
        })
        .catch(err => {
          console.log(err);
        });
    });

    /*  console.log(res.data);
          setUserinfo(Userinfo, ...res.data)
          console.log(Userinfo);*/
  }, []);
  function addScore() {
    setScore(
      score +
        1 *
          (Number(GamePrestiges.levels[prestige].multi) +
            Number(items.items[itemLevel].multi)),
    );
  }

  function addPrestige() {
    setItemLevel(0);
    setHasPassedPrestige(false);
    setScore(0);
    setIsClicked(true);
    setPrestige(prestige + 1);
  }
  // a faire demain
  function addItem() {
    setScore(score - Number(items.items[itemLevel + 1].cost));
    setItemLevel(itemLevel + 1);
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <BlueText>{score}</BlueText>
        <SettingsButton onPress={() => navigation.navigate('Settings')}>
          <TrophyIcon>Settings</TrophyIcon>
        </SettingsButton>
        <LeaderboardButton onPress={() => navigation.navigate('Leaderboard')}>
          <TrophyIcon>Leaderboard</TrophyIcon>
        </LeaderboardButton>
      </ClickView>
      {hasPassedPrestige ? (
        <TouchableElements onPress={addPrestige}>
          <PrestigeCost>{GamePrestiges.levels[prestige].cost}</PrestigeCost>
        </TouchableElements>
      ) : (
        <PrestigeCost>{GamePrestiges.levels[prestige].cost}</PrestigeCost>
      )}
      {hasPassedItem ? (
        <TouchableElements onPress={addItem}>
          <ItemCost>{items.items[itemLevel + 1].cost}</ItemCost>
        </TouchableElements>
      ) : (
        <ItemCost>{items.items[itemLevel + 1].cost}</ItemCost>
      )}
    </SafeAreaView>
  );
};

const TouchableElements = styled.TouchableOpacity`
  bottom: 2%;
`;

const PrestigeCost = styled.Text`
  position: absolute;
  font-size: 20px;
  right: 0;
  bottom: 2%;
  padding-right: 50px;
  color: grey;
`;

const ItemCost = styled.Text`
  position: absolute;
  font-size: 20px;
  bottom: 2%;
  align-self: center;
  color: grey;
`;

export default Game;