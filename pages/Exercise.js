import React from 'react';
import { View,Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';

function Exercise() {
  const [videoSource, setVideoSource] = useState(null);
  const exname = 'Plank';
  const quants = 'Time: 60s'
  const description = 'Place your ellbows on the ground keep your back and legs straight. Make sure that your hands make a 90 degreee angle.'
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf')
    });

  const handleTouchStart = () => {
    setActive(true);
    console.log("Clicked Next");
  }
  const handleTouchEnd = () => setActive(false);
  

  const textrp = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.03,
  textAlign: 'center',
  position: 'absolute',
  marginTop: screenHeight*0.04,
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
    backgroundColor: active ? '#C46B1B' : '#F3831E',
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
    marginTop: screenWidth*0.05,
    marginLeft: screenWidth*0.05,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const video = {
    flex: 1,
    alignSelf: 'stretch'
  }

  const line = { 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.45,
    marginLeft: screenWidth*0.275,
    marginTop: screenHeight*0.07
  }

  const bottom = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: screenHeight*0.4,
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
  position: 'absolute',
  width: '40%',
  padding: 15,
  borderRadius: 10,
  marginLeft: screenWidth*0.3,
  marginTop: screenHeight*0.4,
  };

  const descript = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.026,
  textAlign: 'left',
  position: 'absolute',
  width: '80%',
  marginLeft: screenWidth*0.1,
  marginTop: screenHeight*0.52,
  };

  const clicked = () => {
    console.log("Clicked back");
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    setVideoSource(require('../assets/video.mp4'));
  }, []);

  return (
    <View style={background}>
      
      <Video source={videoSource} style={video} isLooping={true} shouldPlay={true}/>

      <Text style={textrp}>{exname}</Text>

      <Text style={quantity}>{quants}</Text>

      <View style={line} />

      <View style={bottom}>

        <View style={lines} />

        <Text style={dtext}>Exercise description</Text>

        <View style={lines} />

      </View>

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Next</TouchableOpacity>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

      <Text style={descript}>{description}</Text>

    </View>
  ); 
s
//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>

}

export default Exercise;