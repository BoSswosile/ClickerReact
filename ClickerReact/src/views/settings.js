import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';
import {BlueText, ClickView, Disconnect} from '../styled/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {
  const DisconnectClick = () => {
    navigation.navigate('Public', {screen: 'Login'});
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('prestige');
  };
  return (
    <ClickView>
      <BlueText>Test</BlueText>
      <TouchableOpacity onPress={DisconnectClick}>
        <Disconnect>Se déconnecter</Disconnect>
      </TouchableOpacity>
    </ClickView>
  );
};

export default Settings;
