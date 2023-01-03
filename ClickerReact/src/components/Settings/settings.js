import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View
} from 'react-native';
import styled from 'styled-components';
import {Disconnect, ViewGlobal} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = ({navigation}) => {
  const DisconnectClick = () => {
    navigation.navigate('Public', {screen: 'Login'});
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('prestige');
  };
  return (
    <SafeAreaView>
      <ViewGlobal>
      <TouchableOpacity onPress={DisconnectClick}>
        <Disconnect>Se déconnecter</Disconnect>
      </TouchableOpacity>
      </ViewGlobal>
    </SafeAreaView>
  );
};

export default Settings;
