import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import styled from 'styled-components';
import {BlueText} from '../styled/style';

const Leaderboard = props => {
  const [Userinfo, setUserinfo] = useState({});
  const obj = Userinfo;

  useEffect(() => {
    getLeaderboardState();
    //Runs only on the first render
  }, []);

  useEffect(() => {
    console.log(Userinfo);
  }, [Userinfo]);

  const getLeaderboardState = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://10.0.2.2:3001/api/v1/auth/leaderboard',
        limit: 10,
      });
      console.log(res.data);
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
        <FlatList
          data={Object.keys(obj)}
          renderItem={({item}) => (
            <BlueText>
              {obj[item].firstName} {obj[item].prestige}
            </BlueText>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
/*const CheckText = styled.Text`
  color: black;
  size: 30px;
  text-align: right;
  padding-right: 15px;
`;*/
export default Leaderboard;
