import {authorize, refresh} from 'react-native-app-auth';
import {Text} from 'react-native';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from "react-native-spotify-remote";

import SpotifyWebApi from 'spotify-web-api-js';
var spotifyApi = new SpotifyWebApi();
var accessToken = ""

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '08f3d644516e4b3db1eb2f92155ac900',
      clientSecret: '118ffdc93ac24f9d9054fa2116ddd885',
      redirectUrl: 'com.acesproject:/oauthredirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'streaming',
        'app-remote-control'
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
        // tokenEndpoint: 'http://ec2-54-210-156-208.compute-1.amazonaws.com:5000/code_to_access_token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      alert(JSON.stringify(result));
      spotifyApi.setAccessToken(result.accessToken);
      // await SpotifyRemote.connect(result.accessToken);
      // console.log("access token: " + accessToken)
      accessToken = result.accessToken;
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    } 
  }

  async playSong() {
    try {
      // console.log("access token: " + accessToken)
      // await SpotifyRemote.connect(accessToken);
      // // await SpotifyRemote.playUri("spotify:track:6IA8E2Q5ttcpbuahIejO74");
      // // await SpotifyRemote.seek(58000);
      spotifyApi.queue("6IA8E2Q5ttcpbuahIejO74")
      spotifyApi.skipToNext()
      spotifyApi.play({})
    } catch (err) {
      console.error("Couldn't authorize with or connect to Spotify", err);
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }

}

const authHandler = new AuthenticationHandler();

export default authHandler;