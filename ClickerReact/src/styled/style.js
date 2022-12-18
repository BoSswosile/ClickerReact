import styled from "styled-components";
// login

//Utilisation des styled components
export const LoginButton = styled.TouchableOpacity`
  background-color: red;
  padding: 12px;
  border-radius: 4px;
`;

export const TextInputContainer = styled.View`
  margin: 10px;
`;

export const TextInputStyled = styled.TextInput`
  background-color: red;
  padding: 12px;
  border-radius: 12px;
  color: white;
`;

// game
export const ClickView = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
`;

export const BlueText = styled.Text`
  font-size: 30px;
  color: blue;
  text-align: center;
  justify-items: center;
`;

export const TrophyIcon = styled.Text`
  color: black;
  size: 30px;
  text-align: right;
  padding-right: 15px;
`;