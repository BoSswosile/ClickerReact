import styled from 'styled-components';
// login

const test = '-50%';

//Utilisation des styled components
export const LoginButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 40%;
  background-color: purple;
  padding: 12px;
  border-radius: 4px;
`;

export const TextInputContainer = styled.View`
  margin: 10px;
`;

export const TextInputStyled = styled.TextInput`
  background-color: purple;
  padding: 12px;
  border-radius: 12px;
  color: white;
`;

export const ImageView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const ViewMiddle = styled.View`
  justify-content: center;
  background-color: lightgray;
  width: 100%;
  height: 100%;
`;

export const LoginText = styled.Text`
  font-size: 30px;
  padding-left: 10px;
  color: gray;
`;

export const ClickerImage = styled.Image`
  width: 80%;
  height: 33%;
  align-items: center;
`;

// game
export const ClickView = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  position: relative;
`;

export const BlueText = styled.Text`
  font-size: 30px;
  color: blue;
  text-align: center;
`;

export const TrophyIcon = styled.Text`
  color: grey;
  font-size: 15px
  padding-right: 15px;
`;
export const LeaderboardButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 55%;
`;
export const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 2%;
`;

// Settings

export const Disconnect = styled.Text`
  position: absolute;
  color: grey;
  font-size: 20px;
  align-self: center;
`;
export const TouchableDisconnect = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-content: center;
`;
