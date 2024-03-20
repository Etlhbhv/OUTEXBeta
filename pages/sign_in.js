import React from 'react';
import { View,Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import Loading from './Loading';

initializeApp(firebaseConfig);

const auth = getAuth();

function SignIn() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf')
    });
  

  const textsignin = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.08,
  textAlign: 'center',
  position: 'absolute',
  marginTop: screenHeight*0.23,
  width: '100%'
  };

  const background = {
    backgroundColor: '#2A2B30',
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  };

  const email = {
    backgroundColor: '#2A2B30',
    color: '#ffffff',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.025,
    borderRadius: 1,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    textAlign: 'left',
    position: 'absolute',
    marginTop: screenHeight*0.33,
    alignSelf: 'center',
    padding: 5,
    width: screenWidth*0.5
  }

  const password = {
    backgroundColor: '#2A2B30',
    color: '#ffffff',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.025,
    borderRadius: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    textAlign: 'left',
    position: 'absolute',
    marginTop: screenHeight*0.39,
    alignSelf: 'center',
    padding: 5,
    width: screenWidth*0.5
  }

  const signinbutton = {
    backgroundColor: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: screenWidth*0.52,
    marginTop: screenHeight*0.47,
    position: 'absolute',
    padding: 7,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const bottom = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: screenHeight*0.8,
    padding: 15
  }

  const lines = {
    flex: 1, 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#ffffff',
    width: screenWidth*0.1
  }

  const question = {
    marginHorizontal: 10,
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.027,
  }

  const signupbutton = {
    backgroundColor: '#2A2B30',
    color: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight*0.85,
    position: 'absolute',
  }

  const nextbuttontext = {
    backgroundColor: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
  }

  const forgotbutton = {
    backgroundColor: '#2A2B30',
    color: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.024,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight*0.55,
    position: 'absolute',
  }

  const clicked = () => {
    navigation.navigate('SignUp')
  }

  const clickedForgot = () => {
    navigation.navigate('EmailPR')
  }

  const [em, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const handleSignIn = async () => {
    console.log('Clicked sign in button');
    try {
      await signInWithEmailAndPassword(auth ,em, pass);
      console.log('User signed in successfully!');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const warningemail = {
    color: '#EF0000',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.02,
  textAlign: 'center',
  position: 'absolute',
  alignSelf: 'center',
  marginTop: screenHeight*0.37,
  width: '60%'
  }

  const warningpassword = {
    color: '#EF0000',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.02,
  textAlign: 'center',
  position: 'absolute',
  alignSelf: 'center',
  marginTop: screenHeight*0.43,
  width: '60%'
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate("Profile");}})
  
      if (!isLoaded) {
        return(<Loading/>);
      }
    

  return (
    <View style={background}>

      <Text style={textsignin}>Sign In</Text>

      <TextInput type={'email'} placeholder='Email' style={email} onChangeText={(text) => setEmail(text)} value={em}/>

      <TextInput type={'password'} placeholder='Password' style={password} onChangeText={(text) => setPassword(text)} value={pass}/>

      <TouchableOpacity onPress={handleSignIn} style={signinbutton}><Text style={nextbuttontext}>Log In</Text></TouchableOpacity>

      <Text style ={forgotbutton} onPress = {clickedForgot}>Forgot your password?</Text>

      <View style={bottom}>

        <View style={lines} />

        <Text style={question}>Don't have an account yet?</Text>

        <View style={lines} />

      </View>

        <Text style ={signupbutton} onPress = {clicked}>Sign Up</Text>

    </View>
  );

  //Add later <Text style={warning}>Email isn't registered.</Text>
  //Add later <Text style={warningpassword}>Password or email are wrong!</Text>

}

export default SignIn;