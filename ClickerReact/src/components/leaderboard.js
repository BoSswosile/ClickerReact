import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Leaderboard = props => {
  return (
    <View>
      <CheckText>test1</CheckText>
      <CheckText>test1</CheckText>
      <CheckText>test1</CheckText>
      <CheckText>test1</CheckText>
      <CheckText>test1</CheckText>
    </View>
  );
};

const CheckText = styled.Text`
  color: black;
  size: 30px;
  text-align: right;
  padding-right: 15px;
`;
export default Leaderboard;
