import React from 'react';
import { View,Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { getAuth} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc, setDoc} from 'firebase/firestore'

initializeApp(firebaseConfig);

const auth = getAuth();
const base = getFirestore();

function ProfileE() {

  const [username, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState("");

  const uid = auth.currentUser?.uid;

const getdocs = async () =>{
  try{
  const docRef = doc(base, "User",uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  setName(docSnap.data().username);
  setHeight(docSnap.data().height);
  setWeight(docSnap.data().weight);
  setDate(docSnap.data().birthdate);
} else {
  console.log("No such document!");}}
  catch (error) {
    console.error('Error getting doc:', error);}
}

const setdocs = async () =>{
  try{
  await setDoc(doc(base, "User", uid), {
    username: username,
    birthdate: date,
    height: height,
    weight: weight
  });}
  catch (error) {
    console.error('Error creating doc:', error);}
}

  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchStart = () => {
    setActive(true);
    console.log('Clicked save');
    setdocs();
    navigation.navigate("Profile");
  }
  const handleTouchEnd = () => setActive(false);
  
  const background = {
    backgroundColor: '#2A2B30',
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  };

  const nextbutton = {
    backgroundColor: active ? '#C46B1B' : '#F3831E',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: screenWidth*0.52,
    marginTop: screenHeight*0.7,
    position: 'absolute',
    padding: 7,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
    marginTop: screenWidth*0.05,
    marginLeft: screenWidth*0.05,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const name = {
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
    marginTop: screenHeight*0.37,
    marginLeft: screenWidth*0.05,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.45,
    borderColor: '#F3831E',
  }

  const namepic = {
    width: screenWidth*0.06,
    height: screenWidth*0.06,
    marginTop: screenHeight*0.372,
    marginLeft: screenWidth*0.22,
    position: 'absolute'
  }
  const dates = {
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
    marginTop: screenHeight*0.42,
    marginLeft: screenWidth*0.05,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.45,
    borderColor: '#F3831E',
    mode:'date',
    format: "DD/MM/YYYY"
  }

  const datepic = {
    width: screenWidth*0.06,
    height: screenWidth*0.06,
    marginTop: screenHeight*0.422,
    marginLeft: screenWidth*0.22,
    position: 'absolute'
  }

  const heights = {
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
    marginTop: screenHeight*0.47,
    marginLeft: screenWidth*0.05,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.45,
    borderColor: '#F3831E',
  }

  const heightpic = {
    width: screenWidth*0.06,
    height: screenWidth*0.06,
    marginTop: screenHeight*0.472,
    marginLeft: screenWidth*0.22,
    position: 'absolute'
  }

  const weights = {
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
    marginTop: screenHeight*0.52,
    marginLeft: screenWidth*0.05,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.45,
    borderColor: '#F3831E',
  }

  const weightpic = {
    width: screenWidth*0.06,
    height: screenWidth*0.06,
    marginTop: screenHeight*0.522,
    marginLeft: screenWidth*0.22,
    position: 'absolute'
  }

  const clicked = () => {
    console.log('Clicked back');
    navigation.goBack();
  }

  useEffect(() => {
    getdocs();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <View style={background}>

      <Image source={require('../assets/Name.png')} style={namepic}/>

      <TextInput type={'name'} placeholder={'Name'} style={name} defaultValue={username} onChangeText={(text) => setName(text)}/>

      <Image source={require('../assets/Date.png')} style={datepic}/>

      <TextInput type={'name'} style={dates} placeholder={'Date of birth'} defaultValue={date} onChangeText={(text) => setDate(text)}/>

      <Image source={require('../assets/Height.png')} style={heightpic}/>

      <TextInput type={'height'} placeholder={'Height cm'} style={heights} defaultValue={height} onChangeText={(text) => setHeight(text)}/>

      <Image source={require('../assets/Weight.png')} style={weightpic}/>

      <TextInput type={'weight'} placeholder={'Weight kg'} style={weights} defaultValue={weight} onChangeText={(text) => setWeight(text)}/>  

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Save</TouchableOpacity>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

    </View>
  ); 

}

export default ProfileE;