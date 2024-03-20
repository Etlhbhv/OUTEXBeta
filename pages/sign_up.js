import React from 'react';
import { View,Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

initializeApp(firebaseConfig);

const auth = getAuth();

function SignUp() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchEnd = () => setActive(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate("Profile");}})
  
  const textsignup = {
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
    placeholderTextColor: '#ffffff',
    backgroundColor: '#2A2B30',
    color: '#ffffff',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.025,
    borderBottomRadius: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    textAlign: 'left',
    position: 'absolute',
    marginTop: screenHeight*0.33,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.5
  }

  const password = {
    placeholderTextColor: '#ffffff',
    backgroundColor: '#2A2B30',
    color: '#ffffff',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.025,
    borderBottomRadius: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    textAlign: 'left',
    position: 'absolute',
    marginTop: screenHeight*0.39,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.5
  }

  const signupbutton = {
    backgroundColor: active ? '#C46B1B' : '#F3831E',
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

  const signinbutton = {
    backgroundColor: '#2A2B30',
    color: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight*0.85,
    position: 'absolute',
  }

  const clicked = () => {
    navigation.navigate('SignIn');
  }

  const [em, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const handleSignUp = async () => {
    setActive(true);
    console.log('Clicked sign up button');
    try {
      await createUserWithEmailAndPassword(auth ,em, pass);
      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <View style={background}>

      <Text style={textsignup}>Sign Up</Text>

      <TextInput type={'email'} placeholder='Email' style={email} onChangeText={(text) => setEmail(text)} value={em}/>

      <TextInput type={'password'} placeholder='Password' style={password} onChangeText={(text) => setPassword(text)} value={pass}/>

      <TouchableOpacity onTouchStart={handleSignUp} onTouchEnd={handleTouchEnd} style={signupbutton}>Join</TouchableOpacity>

      <View style={bottom}>

        <View style={lines} />

        <Text style={question}>Already have an account?</Text>

        <View style={lines} />

      </View>

        <Text style ={signinbutton} onClick = {clicked}>Sign In</Text>

    </View>
  );

}

export default SignUp;