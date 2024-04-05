import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { View,Dimensions, Image,Text} from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import {TouchableOpacity} from 'react-native-gesture-handler';
import { ProgressBar } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { getAuth} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
initializeApp(firebaseConfig);

const storage = getStorage();
const auth = getAuth();

function Cameras() {
  const uid = auth.currentUser?.uid;
  const [isVisible, setIsVisible] = useState(false)
  const dt = 100;
  const route = useRoute();
  const { exercises,index,set} = route.params;
  const [progress, setProg] = useState(0);
  const [vuri, setVuri] = useState('');
  const [videoplays, setVideoplay] = useState(false);
  const navigation = useNavigation();
  const [screenHeight, setHei] = useState(Dimensions.get('window').width);
  const [screenWidth, setWid] = useState(Dimensions.get('window').height);
  const screenAverage = (screenHeight+(2*screenWidth))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

    const cameraRef = useRef(null);

  const handleTouchStart = async () => {
    console.log('Clicked Skip');
    await uploadframe();
    if (Object.keys(exercises[index.toString()].quant).length == set+1 && Object.keys(exercises).length == index+1){
      navigation.navigate('SuccessF',{exercises: exercises, index: index, set: set});
    }
    else if (Object.keys(exercises[index.toString()].quant).length == set+1) {
      navigation.navigate('SuccessN',{exercises: exercises, index: index, set: set});
    } else {
      navigation.navigate('Exercise',{exercises: exercises, index: index, set: set+1});
    }
  }
  
  const handleCaptureFrame = async () => {
    if (!cameraRef.current || videoplays) return;
    try {
    const videoRecordPromise = cameraRef.current.recordAsync({mute: true});
    setVuri(videoRecordPromise);
    setVideoplay(true);

    } catch (error) {
      console.error('Error: Failed to film video: ', error);
    }
  };

  const uploadframe = async () => {
    if (!cameraRef.current || !videoplays) return;
    try {
      cameraRef.current.stopRecording();
      setVideoplay(false);
      const video = await vuri
      const response = await fetch(video.uri);
      const blob = await response.blob();
  
      const storageRef = ref(storage, 'exercise/' + exercises[index].id + '/' + uid +  Date.now() + '.mp4');
  
        const uploadTaskSnapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
  
        console.log('Uploaded video URL:', downloadURL);
  
      } catch (error) {
        console.error('Error: Failed to upload video: ', error);
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
    marginTop: screenHeight*0.78,
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
    marginTop: screenHeight*0.78,
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

  const clicked = async () => {
    console.log('Clicked back');
    await uploadframe();
    navigation.navigate('Exercise',{exercises: exercises, index: index, set: set});
  }

  const pause = '../assets/Pause.png';
  const play = '../assets/Play.png';
  const [current, setCurrent] = React.useState(false);
  const [path, setPath] = React.useState(require(pause));
  const clickedPause = () => {
    if (current) {
        setPath(require(play));
        console.log('Clicked pause');
        uploadframe();
    }
    else {
        setPath(require(pause));
        console.log('Clicked play');
        handleCaptureFrame();
    }
    setCurrent(!current);
  }

  const handleCameraReady = () => {
    setTimeout(() => {
      setCurrent(true);
      handleCaptureFrame();
    }, 5000); // Adjust the delay time as needed
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsVisible(true)
    if (screenHeight>screenWidth){
    setHei(Dimensions.get('window').height);
    setWid(Dimensions.get('window').width);}
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      const {grantedAudio }= await Camera.requestMicrophonePermissionsAsync();
      console.log(grantedAudio);
    })();
    const interval = setInterval(() => {
      setProg(progress => {
        if (progress > 1){
          clearInterval(interval);
          handleTouchStart();
        }
        if (current){
          if (exercises[index.toString()].time){
            return progress + 1/((exercises[index.toString()].quant[set.toString()]*1000)/dt);
          }
          else{
            return progress + 1/((exercises[index.toString()].quant[set.toString()]*5000)/dt)
          }
        }
        return progress;
      });
    }, dt);

    return () => {
      clearInterval(interval);
      setIsVisible(false)
    }
  }, [current]));

  return (
    <View style={background}>
      {isVisible && 
        <>
          <Camera style={{height: '100%',width: '100%'}} type={Camera.Constants.Type.front} ref={cameraRef} onCameraReady={handleCameraReady}>

          <View style={{backgroundColor: 'transparent', flex: 1}}>
      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={texts}>Skip</Text></TouchableOpacity>

      <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>

<TouchableOpacity onPress = {clickedPause}><Image source={path} style={pausebutton}/></TouchableOpacity>

<ProgressBar progress={0.8*progress} style={pbar} theme={{ colors: { primary: '#F3831E' } }}/>
</View>
</Camera>
</>
      }
    </View>
  ); 

}

export default Cameras;