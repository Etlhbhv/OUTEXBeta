import React from 'react';
import { useEffect, useState } from 'react';
import { View,Dimensions, Image,Text, ImageBackground} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import {TouchableOpacity} from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import { Camera } from 'expo-camera';

function Cameras() {
  const route = useRoute();
  const [feed,setFeed] = useState(require('../assets/Logo.png'))
  const { exercises,index,set} = route.params;
  const progress = 0.5;
  const navigation = useNavigation();
  const [screenHeight, setHei] = useState(Dimensions.get('window').width);
  const [screenWidth, setWid] = useState(Dimensions.get('window').height);
  const screenAverage = (screenHeight+(2*screenWidth))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

    const sendToHostUrl = 'http://172.29.40.162:5000/send_to_host';
    const recieveFromHostUrl = 'http://172.29.40.162:5000/send_to_client';
    const [cameraRef, setCameraRef] = useState(null);

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

  const sendHost = async () => {
    try {
      const variableToSend = 'Hello from Expo app!';
      await fetch(sendToHostUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ variable: variableToSend }),
      });
      console.log('Variable sent successfully');
    } catch (error) {
      console.error('Error sending variable:', error);
    }
  };

  const recieveHost = async () => {
    try {
      const response = await fetch(recieveFromHostUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch variable');
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error fetching variable:', error);
    }
  };
  
  const handleCaptureFrame = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        
        const formData = new FormData();
        formData.append('photo', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await fetch(sendToHostUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const processedPhoto = await response.blob();
        setFeed({uri:processedPhoto});

      } catch (error) {
        console.error('Error capturing frame:', error);
      }
    }
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
    backgroundColor: '#F3831E',
    borderRadius: 7,
    width: screenWidth*0.16,
    marginLeft: screenHeight*0.1,
    marginTop: screenHeight*0.82,
    position: 'absolute',
    padding: 10
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

  const pbar = {
    width: screenWidth*0.8,
    height: screenHeight*0.12,
    marginTop: screenHeight*0.06,
    marginLeft: screenHeight*0.26,
    borderRadius: screenHeight*0.06,
    BarProp: '#F3831E',
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
        //sendHost();
        handleCaptureFrame();
    }
    else {
        setPath(require(pause));
        console.log('Clicked play');
        recieveHost();
    }
    setCurrent(!current);
  }

  useFocusEffect(
    React.useCallback(() => {
    setHei(Dimensions.get('window').width);
    setWid(Dimensions.get('window').height);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
    })();
  }, []));

  return (
    <View style={background}>
     <Camera style={{height: '10%',width: '10%'}} type={Camera.Constants.Type.front} ref={ref => setCameraRef(ref)}/>
     <ImageBackground
        source={feed}
        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}
      >
     <View style={{backgroundColor: 'transparent', flex: 1}}>
      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={texts}>Skip</Text></TouchableOpacity>

      <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

<TouchableOpacity onPress = {clickedPause}><Image source={path} style={pausebutton}/></TouchableOpacity>

<ProgressBar progress={0.8*progress} style={pbar} theme={{ colors: { primary: '#F3831E' } }}/>
</View>
</ImageBackground>
    </View>
  ); 

}

export default Cameras;