import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,TouchableOpacity, Text} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation'

function Camera() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenHeight+(2*screenWidth))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchStart = () => {
    setActive(true);
    console.log('Clicked Skip')
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
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
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
    marginLeft: screenHeight*0.1,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const pausebutton = {
    width: screenHeight*0.16,
    height: screenHeight*0.16,
    marginTop: screenHeight*0.82,
    marginLeft: screenWidth*0.88,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
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

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    if (animate) {
      const animation = window.requestAnimationFrame(() => {
        setRectHeight(rectHeight + 1);
      });

      if (rectHeight >= screenWidth*0.8) {
        window.cancelAnimationFrame(animation);
      }
    }
  }, [animate, rectHeight, height]);

  return (
    <View style={background}>

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}><Text>Skip</Text></TouchableOpacity>

      <Image onPress = {clicked} source={require('../assets/back.png')} style={backbutton}/>

      <Image onPress = {clickedPause} source={path} style={pausebutton}/>

      <Svg width="100%" height="100%">
      <Rect
        y="6%"
        x='15%'
        height={screenHeight*0.11}
        width={screenWidth*0.8}
        fill={'white'}
        rx={screenHeight*0.055}
        ry={screenHeight*0.055}
      />

      <Rect
        y='6%'
        x= '15%'
        height={screenHeight*0.11}
        width={rectHeight}
        fill={'#F3831E'}
        rx={screenHeight*0.055}
        ry={screenHeight*0.055}
      />
    </Svg>

    </View>
  ); 

//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>

}

export default Camera;