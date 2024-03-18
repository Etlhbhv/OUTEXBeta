import React from 'react';
import { View,Dimensions, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect} from 'react';

function Reset() {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [active, setActive] = React.useState(false);
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'LeagueSpartan-Regular': require('../../assets/fonts/LeagueSpartan-Regular.ttf')
    });

  const handleTouchStart = () => {
    setActive(true);
    navigation.navigate('SignIn');
  }
  const handleTouchEnd = () => setActive(false);
  

  const textrp = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.05,
  textAlign: 'center',
  position: 'absolute',
  marginTop: screenHeight*0.21,
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

  const password = {
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
    marginTop: screenHeight*0.35,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.5
  }

  const repeatpassword = {
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
    marginTop: screenHeight*0.43,
    alignSelf: 'center',
    padding: 5,
    borderTopWidth: 0,
    width: screenWidth*0.5
  }

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
    marginTop: screenHeight*0.6,
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

  const clicked = () => {
    navigation.navigate('CodePR');
  }

  const warning = {
    color: '#EF0000',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.02,
  textAlign: 'center',
  position: 'absolute',
  alignSelf: 'center',
  marginTop: screenHeight*0.49,
  width: '60%'
  }

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <View style={background}>

      <Text style={textrp}>Reset Password</Text>

      <TextInput type={'password'} placeholder='Password' style={password}/>

      <TextInput type={'password'} placeholder='Repeat password' style={repeatpassword}/>

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Next</TouchableOpacity>

      <Image onClick = {clicked} source={require('../../assets/back.png')} style={backbutton}/>

    </View>
  ); 

    //Add later <Text style={warning}>Passwords do not match, try one more time.</Text>

}

export default Reset;