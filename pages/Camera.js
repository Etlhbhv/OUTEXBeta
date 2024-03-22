import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,TouchableOpacity, Text, ProgressBar} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/native';
import Svg, { Rect } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation'

function Camera() {
  const route = useRoute();
  const { exercises,index,set} = route.params;
  const navigation = useNavigation();
  const [screenHeight, setHei] = useState(Dimensions.get('window').width);
  const [screenWidth, setWid] = useState(Dimensions.get('window').height);
  const screenAverage = (screenHeight+(2*screenWidth))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchStart = () => {
    console.log('Clicked Skip')
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
    borderRadius: 7,
    width: screenWidth*0.16,
    marginLeft: screenHeight*0.1,
    marginTop: screenHeight*0.82,
    position: 'absolute',
    padding: 10,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const backbutton = {
    width: screenHeight*0.16,
    height: screenHeight*0.16,
    marginTop: screenHeight*0.05,
    marginLeft: screenHeight*0.05,
    position: 'absolute'
  }

  const pausebutton = {
    width: screenHeight*0.16,
    height: screenHeight*0.16,
    marginTop: screenHeight*0.82,
    marginLeft: screenWidth*0.88,
    position: 'absolute'
  }

  const texts = {
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.035,
    textAlign:'center'
  }

  const clicked = () => {
    console.log('Clicked back');
    navigation.goBack();
  }

  const pause = '../assets/Pause.png';
  const play = '../assets/Play.png';
  const [current, setCurrent] = React.useState(true);
  const [path, setPath] = React.useState(require(pause));
  const clickedPause = () => {
    if (current) {
        setPath(require(play));
        console.log('Clicked pause');
    }
    else {
        setPath(require(pause));
        console.log('Clicked play');
    }
    setCurrent(!current);
  }

  const height = 0;
  const animate = true;
  const [rectHeight, setRectHeight] = useState(height);

  useFocusEffect(
    React.useCallback(() => {
    setHei(Dimensions.get('window').width);
    setWid(Dimensions.get('window').height);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    /*if (animate) {
      const animation = window.requestAnimationFrame(() => {
        setRectHeight(rectHeight + 1);
      });

      if (rectHeight >= screenWidth*0.8) {
        window.cancelAnimationFrame(animation);
      }
    }*/
  }, [animate, rectHeight, height]));

  return (
    <View style={background}>

      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={texts}>Skip</Text></TouchableOpacity>

      <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

<TouchableOpacity onPress = {clickedPause}><Image source={path} style={pausebutton}/></TouchableOpacity>
<ProgressBar progress={0.5} width={200} />

    </View>
  ); 

//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>

}

export default Camera;