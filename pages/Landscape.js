import React from 'react';
import { View,Dimensions, Image, Text } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect } from 'react-native-svg';

function Landscape() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

    const background = {
        backgroundColor: '#2A2B30',
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0
      };

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
    marginTop: screenWidth*0.05,
    marginLeft: screenWidth*0.05,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const clicked = () => {
    console.log('Clicked back')
  }

  const tip = {
    color: 'black',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.04,
  alignSelf: 'center',
  textAlign: 'center',
  position: 'absolute',
  marginTop: screenHeight*0.45,
  width: '60%'
  }

  return (
    <View style={background}>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

      <Text style={tip}>Please turn your phone sideways! To landscape orientation.</Text>

      <Svg width="100%" height="100%">
      <Rect
        y={(screenHeight*0.36)-10}
        x={(screenWidth*0.1)-10}
        height={(screenHeight*0.28)+20}
        width={(screenWidth*0.8)+20}
        fill={'#F3831E'}
        rx={10}
        ry={10}
      />

      <Rect
        y="36%"
        x='10%'
        height={screenHeight*0.28}
        width={screenWidth*0.8}
        fill={'white'}
        rx={10}
        ry={10}
      />
    </Svg>

    </View>
  ); 

}

export default Landscape;