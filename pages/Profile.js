import React from 'react';
import { View,Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect} from 'react';

function Profile() {
  const username = 'Ernest';
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
    console.log('Clicked edit');
  }
  const handleTouchEnd = () => setActive(false);
  

  const textrp = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.035,
  textAlign: 'center',  
  position: 'absolute',
  marginTop: screenHeight*0.4,
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

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
    marginTop: screenWidth*0.05,
    marginLeft: screenWidth*0.05,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }
  const lines = { 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.55,
    marginLeft: screenWidth*0.225,
    marginTop: screenHeight*0.43
  }

  const picture = {
    width: screenWidth*0.5,
    height: screenWidth*0.5,
    marginTop: screenWidth*0.25,
    marginLeft: screenWidth*0.25,
    position: 'absolute',
    borderRadius: screenWidth*0.25,
    borderWidth: 15,
    borderColor: '#F3831E',
  }

  const clicked = () => {
    console.log('Clicked back');
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <View style={background}>
      <Image source={require('../assets/photo.jpeg')} style={picture}/>

      <Text style={textrp}>{username}</Text>

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Edit profile</TouchableOpacity>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

      <View style={lines} />

    </View>
  ); 

}

export default Profile;