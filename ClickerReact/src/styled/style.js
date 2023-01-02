import styled from 'styled-components';
// login

//Utilisation des styled components

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
  font-size: 15px;
  padding-right: 15px;
`;
export const LeaderboardButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 10%;
  padding-right: 10px;
`;
export const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 2%;
  margin-right: 10px;
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
