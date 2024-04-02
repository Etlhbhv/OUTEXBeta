import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,Text} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import {TouchableOpacity} from 'react-native-gesture-handler';

function Cameras() {
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
    console.log('Clicked Skip');
    if (Object.keys(exercises[index.toString()].quant).length == set+1 && Object.keys(exercises).length == index+1){
      navigation.navigate('SuccessF',{exercises: exercises, index: index, set: set});
    }
    else if (Object.keys(exercises[index.toString()].quant).length == set+1) {
      navigation.navigate('SuccessN',{exercises: exercises, index: index, set: set});
    } else {
      navigation.navigate('Exercise',{exercises: exercises, index: index, set: set+1});
    }
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
    navigation.navigate('Exercise',{exercises: exercises, index: index, set: set});
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

  useFocusEffect(
    React.useCallback(() => {
    setHei(Dimensions.get('window').width);
    setWid(Dimensions.get('window').height);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []));

  return (
    <View style={background}>
      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={texts}>Skip</Text></TouchableOpacity>

      <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

<TouchableOpacity onPress = {clickedPause}><Image source={path} style={pausebutton}/></TouchableOpacity>

    </View>
  ); 

}

export default Cameras;