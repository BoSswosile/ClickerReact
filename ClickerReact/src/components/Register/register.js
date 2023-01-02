import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginButton,
  TextInputContainer,
  TextInputStyled,
  ViewMiddle,
  LoginText,
  ClickerImage,
  ImageView,
} from '../../styled/style';

const Register = ({navigation}) => {
  const [firstName, setfirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        navigation.navigate('Auth', {screen: 'Game'});
      }
    });
  });

  //fonction pour récuperer un token
  const RegisterMeIn = async () => {
    //Verification des champs
    if (firstName.length < 3) {
      alert('Firstname must be at least 3 characters long');
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    axios({
      method: 'post',
      url: 'http://10.0.2.2:3001/api/v1/auth/register',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    })
      .then(async res => {
        navigation.navigate('Public', {screen: 'Login'});
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ViewMiddle>
      <ImageView>
        <ClickerImage source={require('../../img/reactClicker.png')} />
      </ImageView>
      <LoginText>Register</LoginText>
      <TextInputContainer>
        <TextInputStyled
          placeholder="Firstname"
          value={firstName}
          onChangeText={text => setfirstName(text)}
        />
      </TextInputContainer>
      <TextInputContainer>
        <TextInputStyled
          placeholder="Lastname"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
      </TextInputContainer>

      <View>
        <TextInputContainer>
          <TextInputStyled
            placeholder="email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </TextInputContainer>
        <TextInputContainer>
          <TextInputStyled
            placeholder="password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </TextInputContainer>
        <LoginButton onPress={RegisterMeIn}>
          <Text>Register</Text>
        </LoginButton>
      </View>
    </ViewMiddle>
  );
};

export default Register;
