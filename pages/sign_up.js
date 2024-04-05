import React from 'react';
import { View,Dimensions, Text, TextInput} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import Loading from './Loading';

initializeApp(firebaseConfig);

const auth = getAuth();

function SignUp() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.navigate("ProfileE");}})
  
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
    borderColor: '#ffffff',
    textAlign: 'left',
    position: 'absolute',
    marginTop: screenHeight*0.39,
    alignSelf: 'center',
    padding: 5,
    width: screenWidth*0.5
  }

  const signupbutton = {
    backgroundColor: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: screenWidth*0.52,
    marginTop: screenHeight*0.05,
    position: 'absolute',
    padding: 7,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const bottom = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: screenHeight*0.15,
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

  const rules = {
    marginHorizontal: 10,
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.027,
  marginTop: screenHeight*0.47,
  width: '60%',
  alignSelf: 'center',
  textAlign: 'center'
  }

  const signinbutton = {
    backgroundColor: '#2A2B30',
    color: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight*0.05
  }

  const signuptext = {
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center',
  }

  const clicked = () => {
    navigation.navigate('SignIn');
  }

  const [em, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const handleSignUp = async () => {
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

  if (!isLoaded) {
    return(<Loading/>);
  }


  return (
    <View style={background}>

      <Text style={textsignup}>Sign Up</Text>

      <TextInput type={'email'} placeholder='Email' style={email} onChangeText={(text) => setEmail(text)} value={em}/>

      <TextInput type={'password'} placeholder='Password' style={password} onChangeText={(text) => setPassword(text)} value={pass}/>

      <Text style={rules}>When you sign up, you accept that your name, birthdate, height, weight and videos from your trainings, will be used by our company to improve your experience. All off your data will be stored confidentially.</Text>
      <TouchableOpacity onPress={handleSignUp} style={signupbutton}><Text style={signuptext}>Join<Text></Text></Text></TouchableOpacity>

      <View style={bottom}>

        <View style={lines} />

        <Text style={question}>Already have an account?</Text>

        <View style={lines} />

      </View>

        <Text style ={signinbutton} onPress = {clicked}>Sign In</Text>

    </View>
  );

}

export default SignUp;