import React from 'react';
import { View,Dimensions, Image, Text } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation} from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { getAuth, signOut} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc} from 'firebase/firestore'
import Loading from './Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';

initializeApp(firebaseConfig);

const auth = getAuth();
const base = getFirestore();

function Profile() {

const uid = auth.currentUser?.uid;

const getdocs = async () =>{
  try {
  const docRef = doc(base, "User",uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  setName(docSnap.data().username);
} else {
  console.log("No such document!");}}
  catch (error) {
    console.error('Error getting doc:', error);
}}

const [username, setName] = useState('');

  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchStart = () => {
    console.log('Clicked edit');
    navigation.navigate("ProfileE");
  }
  

  const textrp = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.035,
  textAlign: 'center',  
  position: 'absolute',
  marginTop: screenHeight*0.38,
  width: '100%'
  };

  const signoutbutton = {
    color: '#F3831E',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.03,
  textAlign: 'center',  
  position: 'absolute',
  marginTop: screenHeight*0.9,
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

  const nextbutton = {
    backgroundColor: '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: screenWidth*0.52,
    marginTop: screenHeight*0.5,
    position: 'absolute',
    padding: 5,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const nextbuttontext = {
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.03,
    alignSelf: 'center',
    textAlign: 'center'
  }

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
    marginTop: screenWidth*0.07,
    marginLeft: screenWidth*0.05,
    position: 'absolute'
  }
  const lines = { 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.55,
    marginLeft: screenWidth*0.225,
    marginTop: screenHeight*0.43
  }


  const clicked = async () => {
    console.log('Clicked back');
    await navigation.goBack();
  }

  const signout = () => {
    console.log('Clicked back');
    signOut(auth).then(() => {
      navigation.navigate('SignIn')
    }).catch((error) => {
    });
  }

  useEffect(() => {
    getdocs();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  if (!isLoaded) {
    return(<Loading/>);
  }

  return (
    <View style={background}>

      <Text style={textrp}>{username}</Text>

      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={nextbuttontext}>Edit profile</Text></TouchableOpacity>

      <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

      <View style={lines} />

      <Text style ={signoutbutton} onPress = {signout}>Sign Out</Text>

    </View>
  ); 

}

export default Profile;