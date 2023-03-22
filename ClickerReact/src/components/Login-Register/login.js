import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
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
  ViewLogin,
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

  const logMeIn = async () => {
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
      <ViewLogin>
        <LoginText>Login</LoginText>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Public', {screen: 'Register'})}>
          <NoAccountText>No account ? Sign up here</NoAccountText>
        </TouchableOpacity>
        <LoginButton onPress={logMeIn}>
          <Text>Login</Text>
        </LoginButton>
      </ViewLogin>
    </ViewMiddle>
  );
};

export default Login;
