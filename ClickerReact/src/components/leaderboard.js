import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const Leaderboard = props => {

const [Userinfo, setUserinfo] = useState([])

  useEffect(() => {
    getLeaderboardState()
    //Runs only on the first render
  }, []);

  const getLeaderboardState = () => {
          axios({
            method: 'get',
            url: 'http://10.0.2.2:3001/api/v1/auth/leaderboard',
            limit: 10,
          })
          .then((res) => {
            console.log(res.data);
            res.map(async object => {
              console.log(object.firstname);
            }),
            setUserinfo(Userinfo, ...res.data)
            console.log(Userinfo);
            }),
            console.log(Userinfo);
              console.log("est");
          }
          
  return (
    <View>
      <Text>noos</Text>
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
