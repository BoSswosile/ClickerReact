import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ItemCost,
  PrestigeCost,
  TouchableElements,
  BlueText,
  ClickView,
  NextItem,
  NextPrestige,
  Title,
} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GamePrestiges from '../../files/prestige.json';
import items from '../../files/items.json';
import Menuicons from '../MenuIcons/menuicons';
import Notification from '../Notifications/notification';

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

  useEffect(() => {
    if (isClicked) {
      AsyncStorage.setItem('prestige', prestige.toString());
      AsyncStorage.getItem('userid').then(resid => {
        axios({
          method: 'put',
          url: `http://10.0.2.2:3001/api/v1/auth/${resid}`,
          data: {
            prestige: prestige,
          },
        })
          .then(res => {
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
    setHasPassedPrestige(false);
    setScore(0);
    setItemLevel(0);
    setIsClicked(true);
    setPrestige(prestige + 1);
    Notification();
  };

  function addItem() {
    setScore(score - Number(items.items[itemLevel + 1].cost));
    setItemLevel(itemLevel + 1);
  }

  return (
    <SafeAreaView onStartShouldSetResponder={addScore}>
      <ClickView>
        <Title>ReactClicker</Title>
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
