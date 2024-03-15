import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,Text} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect } from 'react-native-svg';
import * as ScreenOrientation from 'expo-screen-orientation'

function SuccessN() {
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
    console.log('Clicked Next')
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

  const bar = {
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.05,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: screenHeight*0.6,
    position: 'absolute'
  }

  const clicked = () => {
    console.log('Clicked back');
  }

  const score = 0.70;
  const height = screenHeight*0.65;
  const animate = true;
  const [rectHeight, setRectHeight] = useState(height);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    if (animate) {
      const animation = window.requestAnimationFrame(() => {
        setRectHeight(rectHeight - screenHeight*0.003*score);
      });

      if (rectHeight <= (screenHeight*0.2) + ((1-score)*screenHeight*0.45)) {
        window.cancelAnimationFrame(animation);
      }
    }
  }, [animate, rectHeight, height]);

  return (
    <View style={background}>

      <button onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Next</button>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

    <Svg width="100%" height="100%">
      <Rect
        y="20%"
        x='32.5%'
        height={screenHeight*0.45}
        width={screenWidth*0.35}
        fill={'white'}
        rx={10}
        ry={10}
      />

      <Rect
        y={rectHeight}
        x='32.5%'
        height={(screenHeight*0.65)-rectHeight}
        width={screenWidth*0.35}
        fill={'#F3831E'}
        rx={10}
        ry={10}
      />
    </Svg>

    <Text style={bar}>{`${Math.round(100*(((screenHeight*0.65)-rectHeight)/(0.45*screenHeight)))}%`}</Text>
    </View>
  ); 

//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>

}

export default SuccessN;