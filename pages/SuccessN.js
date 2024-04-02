import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,Text, TouchableOpacity} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation,useFocusEffect, useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Loading from './Loading';

function SuccessN() {
  const route = useRoute();
  const { exercises,index,set} = route.params;
  const navigation = useNavigation();
  const [screenHeight, setHei] = useState(Dimensions.get('window').width);
  const [screenWidth, setWid] = useState(Dimensions.get('window').height);
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

  const handleTouchStart = () => {
    console.log('Clicked Next')
    navigation.navigate('Exercise',{exercises: exercises, index: index+1, set: 0});
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
    marginTop: screenHeight*0.7,
    position: 'absolute',
    padding: 7,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)'
  }

  const nbts = {
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: screenAverage*0.035,
    textAlign:'center',
    width: screenWidth*0.5
  }

  const backbutton = {
    width: screenWidth*0.16,
    height: screenWidth*0.16,
    marginTop: screenWidth*0.07,
    marginLeft: screenWidth*0.05,
    position: 'absolute'
  }

  const clicked = () => {
    console.log('Clicked back');
    navigation.navigate('Cameras',{exercises: exercises, index: index, set: set});
  }

  useFocusEffect(
    React.useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  }, []));

  if (!isLoaded) {
    return (<Loading />);
  }

  return (
    <View style={background}>

      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={nbts}>Next</Text></TouchableOpacity>

      <TouchableOpacity onPress = {clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

    </View>
  ); 


}

export default SuccessN;