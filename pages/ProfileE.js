import React from 'react';
import { View,Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect} from 'react';

function ProfileE() {
  const username = 'Name';
  const height = 'Height';
  const weight = 'Weight';
  const date = new Date(1990,1,1);
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

      <Image source={require('../assets/Name.png')} style={namepic}/>

      <input type={'name'} placeholder={'Name'} style={name} defaultValue={username}/>

      <Image source={require('../assets/Date.png')} style={datepic}/>

      <input type={'date'} style={dates}  defaultValue={date.toISOString().slice(0, 10)}/>

      <Image source={require('../assets/Height.png')} style={heightpic}/>

      <input type={'height'} placeholder={'Height'} style={heights} defaultValue={height}/>

      <Image source={require('../assets/Weight.png')} style={weightpic}/>

      <input type={'weight'} placeholder={'Weight'} style={weights} defaultValue={weight}/>  

      <TouchableOpacity onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={nextbutton}>Save</TouchableOpacity>

      <Image onClick = {clicked} source={require('../assets/back.png')} style={backbutton}/>

    </View>
  ); 

}

export default ProfileE;