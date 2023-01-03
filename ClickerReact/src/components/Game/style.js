import styled from 'styled-components';

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

export const TouchableElements = styled.TouchableOpacity`
  bottom: 2%;
`;

export const PrestigeCost = styled.Text`
  position: absolute;
  font-size: 20px;
  right: 0;
  bottom: 2%;
  padding-right: 50px;
  color: grey;
`;

export const ItemCost = styled.Text`
  position: absolute;
  font-size: 20px;
  bottom: 2%;
  align-self: center;
  color: grey;
`;
