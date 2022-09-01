import React, {Component} from 'react';
import {
  Text, Button, View
} from 'react-native';

import LoginScreen from "./src/screens/Login/loginScreen";

class App extends Component {
  render() {
    return (
    <View>
    <Text>Hello, I am your cat!</Text>
    <Text>Hello, I am your cat!</Text>
    <Text>Hello, I am your cat!</Text>
    <LoginScreen/>
    </View>
    );
  }
}
export default App;