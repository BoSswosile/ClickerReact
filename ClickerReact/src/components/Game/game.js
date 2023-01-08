import React, {createContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

import {
  ItemCost,
  PrestigeCost,
  TouchableElements,
  BlueText,
  ClickView,
  LeaderboardButton,
  SettingsButton,
  NextItem,
  NextPrestige,
} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GamePrestiges from '../../files/prestige.json';
import items from '../../files/items.json';
import Menuicons from '../MenuIcons/menuicons';

const Game = ({navigation}) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [hasPassedPrestige, setHasPassedPrestige] = React.useState(false);
  const [hasPassedItem, setHasPassedItem] = React.useState(false);
  const [itemLevel, setItemLevel] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [prestige, setPrestige] = React.useState(0);
  const [position, setPosition] = useState({x: -20, y: -20});
  const [clickVisible, setClickVisible] = useState(true);
  const [dimensions, setDimensions] = useState();
  const [addedScore, setAddedScore] = useState(null);
  const [prestigeValidate, setPrestigeValidate] = useState(false);

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
      setHasPassedPrestige(true);
    } else {
      setHasPassedPrestige(false);
    }
    if (score >= items.items[itemLevel + 1].cost) {
      setHasPassedItem(true);
    } else {
      setHasPassedItem(false);
    }
  }, [itemLevel, prestige, score]);

  useEffect(() => {
    const dims = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
    setDimensions(dims);
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
    setClickVisible(true);
    setAddedScore(
      1 *
        (Number(GamePrestiges.levels[prestige].multi) +
          Number(items.items[itemLevel].multi)),
    );
    setScore(
      Math.round(
        (score +
          1 *
            (Number(GamePrestiges.levels[prestige].multi) +
              Number(items.items[itemLevel].multi))) *
          100,
      ) / 100,
    );
    const x =
      Math.floor(Math.random() * ((dimensions.width / 100) * 80 - 10 + 1)) + 10;
    const y =
      Math.floor(Math.random() * ((dimensions.height / 100) * 80 - 10 + 1)) +
      10;
    setPosition({x, y});
    setTimeout(() => {
      setClickVisible(false);
    }, 1000);
  }

  const addPrestige = async () => {
    if (prestigeValidate == false || prestige == 0) {
      return;
    }
    setHasPassedPrestige(false);
    setScore(0);
    setIsClicked(true);
    setPrestige(prestige + 1);
  };

  function addItem() {
    setScore(score - Number(items.items[itemLevel + 1].cost));
    setItemLevel(itemLevel + 1);
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <BlueText>{score}</BlueText>
        <Menuicons navigation={navigation} />
        <NextItem>Next Item</NextItem>
        <NextPrestige>Next Prestige</NextPrestige>
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
        {clickVisible && (
          <BlueText style={{left: position.x, top: position.y}}>
            + {addedScore}
          </BlueText>
        )}
      </ClickView>
    </SafeAreaView>
  );
};

export default Game;
