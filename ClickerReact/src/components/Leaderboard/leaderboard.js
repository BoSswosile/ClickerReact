import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import styled from 'styled-components';
import {BlueText, Name, Prestige, GreyText, HorizonView} from './style';

const Leaderboard = props => {
  const [Userinfo, setUserinfo] = useState({});
  const obj = Userinfo;

  useEffect(() => {
    getLeaderboardState();
    //Runs only on the first render
  }, []);

  const getLeaderboardState = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://10.0.2.2:3001/api/v1/auth/leaderboard',
        limit: 10,
      });
      setUserinfo(res.data);
      /*  console.log(res.data);
          setUserinfo(Userinfo, ...res.data)
          console.log(Userinfo);*/
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <GreyText>    Name          Prestige</GreyText>
        <FlatList
          data={Object.keys(obj)}
          renderItem={({item}) => (
            <HorizonView>
              <Name>{obj[item].firstName}</Name>
              <Prestige>{obj[item].prestige}</Prestige>
            </HorizonView>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
