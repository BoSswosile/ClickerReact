import React, {useEffect} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
  NoAccountText,
} from './style';

const Login = ({navigation}) => {
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
        console.log(res.data.id);
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('userid', res.data.id);
        navigation.navigate('Auth', {screen: 'Game'});
      })
      .catch(error => {
        console.log(error);
        alert('The email or password is invalid');
      });
  };
  return (
    <ViewMiddle>
      <ImageView>
        <ClickerImage source={require('../../img/reactClicker.png')} />
      </ImageView>
      <LoginText>Login</LoginText>
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
        <LoginButton onPress={logMeIn}>
          <Text>Login</Text>
        </LoginButton>
        <TouchableOpacity
          onPress={() => navigation.navigate('Public', {screen: 'Register'})}>
          <NoAccountText>No account ? Sign up here</NoAccountText>
        </TouchableOpacity>
      </View>
    </ViewMiddle>
  );
};

export default Login;
