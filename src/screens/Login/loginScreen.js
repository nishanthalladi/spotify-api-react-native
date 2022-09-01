import React, { Component, useState, useEffect } from 'react';
import {
  View, Button, Text
} from 'react-native';

import authHandler from "../../utils/authenticationHandler";

const SessionInfo = () => {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const serverCall = setInterval(() => {
            getSessionData();
        }, 5000);
   
        return () => {
            clearInterval(serverCall)
        };
     }, []);

     const getSessionData = async () => {
        try {
          const response = await fetch('http://ec2-54-210-156-208.compute-1.amazonaws.com:5000/get_session_info?session_id=dre');
          const response_json = await response.json();
          console.log(response_json)
          setData(JSON.stringify(response_json));
        }
        catch (error) {
          console.log(JSON.stringify(error));
        }
      }

     return (<Text>{data}</Text>);

}

class LoginScreen extends Component {
    render() {
        return (
            <View>
                <Button onPress={() => authHandler.onLogin()} title="Press to login"/>
                {/* <Button onPress={() => {authHandler.getSessionData()}} title="Press to join session"/> */}
                <SessionInfo/>
                <Button onPress={() => authHandler.playSong()} title="Play song"/>
            </View>
        );
    }
}

export default LoginScreen;