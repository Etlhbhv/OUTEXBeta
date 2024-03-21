import React from 'react';
import { View,Dimensions, Image, Text, TouchableOpacity, ScrollView,ActivityIndicator} from 'react-native';
import { Video,ResizeMode } from 'expo-av';
import { useFonts } from '@use-expo/font';
import { useNavigation , useRoute} from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc} from 'firebase/firestore'
import Loading from './Loading';

initializeApp(firebaseConfig);

const base = getFirestore();
function Exercise() {
  const [isReady, setIsReady] = useState(false);

  const onLoadStart = () => {
    setIsReady(false);
  };

  const onLoad = () => {
    setIsReady(true);
  };
  const route = useRoute();
  const { exercises,index} = route.params;
  const exname = 'Plank';
  const quants = 'Time: 60s'
  const url = 'https://drive.google.com/file/d/1ELQ6rxUEpBXYcjFGOgF5AoWNMboVo-sg/view?usp=sharing'
  const describtion = 'Place your ellbows on the ground keep your back and legs straight. Make sure that your hands make a 90 degreee angle.'
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf')
    });

  const handleTouchStart = () => {
    console.log("Clicked Next");
  }
  

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
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: screenWidth*0.52,
    marginTop: screenHeight*0.9,
    position: 'absolute',
    padding: 7,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
  }

  const tname = {
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#FFFFFF',
    fontSize: screenAverage*0.035,
    textAlign:'center',
    width: screenWidth*0.5
  }

  const row = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 0.05*screenHeight,
    marginLeft:  0.03*screenWidth
  }

  const line = { 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.5,
    marginTop: 7
  }

  const namecol = {
    flexDirection: 'column',
  alignItems: 'center',
  width: '64%'
}

  const video = {
    width: '90%', 
    height: '35%', 
    alignSelf: 'center'
  }

  const bottom = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 15
  }

  const lines = {
    flex: 1, 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.1
  }

  const dtext = {
    marginHorizontal: 10,
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.027,
  }

  const quantity = {
    color: '#ffffff',
    backgroundColor: '#F3831E',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.037,
  textAlign: 'center',
  width: '50%',
  padding: 15,
  borderRadius: 10,
  marginTop: 0.03*screenHeight
  };

  const setsstyle = {
    color: '#ffffff',
    backgroundColor: '#F3831E',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.037,
  textAlign: 'center',
  width: '50%',
  padding: 15,
  borderRadius: 10,
  };

  const describt = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.026,
  textAlign: 'left',
  width: '80%',
  marginLeft: screenWidth*0.1,
  };

  const clicked = () => {
    console.log("Clicked back");
    navigation.goBack();
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  }, []);

  if (!isLoaded || !isReady) {
    return (<Loading />);
  }

  return (
    <View style={background}>
            <ScrollView contentContainerStyle={{flexGrow: 1,alignItems: 'center'}}>
      
            <View style={row}>
            <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>
            <View style={namecol}>
            <Text style={tname}>baba</Text>
            <View style={line} />
            </View>
            </View>
      <Video source={require('../assets/video.mp4')} style={video} isLooping shouldPlay={true} resizeMode={ResizeMode.CONTAIN}  onLoad={onLoad} onLoadStart={onLoadStart}/>

      <Text style={setsstyle}>Sets</Text>

      <Text style={quantity}>{quants}</Text>

      <View style={bottom}>

        <View style={lines} />

        <Text style={dtext}>Exercise description</Text>

        <View style={lines} />

      </View>

      <TouchableOpacity onTouchStart={handleTouchStart} style={nextbutton}><Text>Start</Text></TouchableOpacity>

      <Text style={describt}>{describtion}</Text>

      </ScrollView>
        </View>
  ); 

//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>

}

export default Exercise;