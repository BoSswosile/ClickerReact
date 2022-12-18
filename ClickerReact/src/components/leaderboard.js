import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Leaderboard = props => {
  const [Userinfo, setUserinfo] = useState({});

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
      const result = await Promise.all(res.data);
    //  console.log(res.data);
      setUserinfo(res.data)
      console.log(Userinfo);
      /*  console.log(res.data);
          setUserinfo(Userinfo, ...res.data)
          console.log(Userinfo);*/
    } catch (err) {
      console.error(err);
    }

    return (
      <View>
        <Text>noos</Text>
      </View>
    );
  };
};
/*const CheckText = styled.Text`
  color: black;
  size: 30px;
  text-align: right;
  padding-right: 15px;
`;*/
export default Leaderboard;
