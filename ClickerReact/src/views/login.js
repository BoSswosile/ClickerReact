import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        navigation.navigate('Game');
      }
    });
  });

  //fonction pour récuperer un token
  const logMeIn = async () => {
    //Verification des champs
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    axios({
      method: 'post',
      url: 'http://10.0.2.2:3001/api/v1/auth/login',
      data: {
        email: email,
        password: password,
      },
    })
      .then(async res => {
        console.log(password, email);
        console.log(res.data.token);
        await AsyncStorage.setItem('token', res.data.token);
        navigation.navigate('Game');
      })
      .catch(error => {
        console.log(error);
      });
    };
  
    /*
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/auth/login',
      data: {
        email: email,
        password: password,
      },
    })
      .then(async response => {
        // console.log(response);
        // console.log(response.headers['x-access-token']);
        await AsyncStorage.setItem('token', response.headers['x-access-token']);
        navigation.navigate('Game');
      })
      .catch(error => {
        console.log(error);
      });*/

  return (
    <View>
      <Text>Login</Text>
      <View>
        <TextInputContainer>
          <TextInputStyled
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInputStyled
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </TextInputContainer>
        <LoginButton onPress={logMeIn}>
          <Text>Login</Text>
        </LoginButton>
      </View>
    </View>
  );
};

//Utilisation des styled components
const LoginButton = styled.TouchableOpacity`
  background-color: red;
  padding: 12px;
  border-radius: 4px;
`;

const TextInputContainer = styled.View`
  margin: 10px;
`;

const TextInputStyled = styled.TextInput`
  background-color: red;
  padding: 12px;
  border-radius: 12px;
  color: white;
`;

export default Login;
