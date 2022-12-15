import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

const Game = ({navigation}) => {
  const [score, setScore] = React.useState(0);
  const [prestige, setPrestige] = React.useState(0);
  console.log(score);

  function addScore() {
    setScore(score + 1);
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <BlueText>{score}</BlueText>
        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
        <TrophyIcon>Leaderboard</TrophyIcon>
        </TouchableOpacity>
      </ClickView>
    </SafeAreaView>
  );
};

const ClickView = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const BlueText = styled.Text`
  font-size: 30px;
  color: blue;
  text-align: center;
  justify-items: center;
`;

const TrophyIcon = styled.Text`
  color: black;
  size: 30px;
  text-align: right;
  padding-right: 15px;
`;
export default Game;
