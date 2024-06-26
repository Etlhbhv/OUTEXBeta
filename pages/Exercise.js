import React from 'react';
import { View,Dimensions, Image, Text,  ScrollView} from 'react-native';
import { Video,ResizeMode } from 'expo-av';
import { useFonts } from '@use-expo/font';
import { useNavigation , useRoute, useFocusEffect} from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useRef, useState} from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc} from 'firebase/firestore'
import {getStorage, ref, getDownloadURL} from 'firebase/storage';
import Loading from './Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';


initializeApp(firebaseConfig);

const base = getFirestore();
const storage = getStorage();
function Exercise() {

  const route = useRoute();
  const vR = useRef(null); 
  const { exercises,index,set} = route.params;
  const [url, setUrl] = useState('');
  const navigation = useNavigation();
  const [screenHeight, setHei] = useState(Dimensions.get('window').height);
  const [screenWidth, setWid] = useState(Dimensions.get('window').width);
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf')
    });

  const handleTouchStart = () => {
    console.log("Clicked Next");
    navigation.navigate('Cameras',{exercises: exercises, index: index, set: set});
  }

  const [describtion, setDescription] = useState('');
  const [exname, setName] = useState('');
  const [qtext,setqtext] = useState('');
  const [sets, setSets] = useState('');

  const getdocs = async () =>{
    try{
    const docRef = doc(base, "Exercises",exercises[index.toString()].id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setName(docSnap.data().name);
    setDescription(docSnap.data().description);
  } else {
    console.log("No such document!");}
    const videoRef = ref(storage, 'videos/'+exercises[index.toString()].id+'.mp4'); // Correct usage
      const downloadUrl = await getDownloadURL(videoRef);
      setUrl(downloadUrl);
    } catch (error) {
      console.error('Error getting doc:', error);
    }
    setSets(Object.keys(exercises[index.toString()].quant).length)
    if (exercises[index.toString()].time){
      setqtext('Time: '+ exercises[index.toString()].quant[set.toString()] + 's');
  }
    else{
      setqtext('Reps: '+ exercises[index.toString()].quant[set.toString()]);
    }
  }

  const background = {
    backgroundColor: '#2A2B30',
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    flex: 1
  };

  const nextbutton = {
    backgroundColor: '#F3831E',
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 10,
    width: screenWidth*0.52,
    marginTop: 0.05*screenHeight,
    padding: 9,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 1)',
    marginBottom: 0.1*screenHeight
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
  }

  const tname = {
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#FFFFFF',
    fontSize: screenAverage*0.035,
    textAlign:'center',
    width: screenWidth*0.5
  }

  const row = {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 0.05*screenHeight,
    marginLeft:  0.03*screenWidth
  }

  const line = { 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.5,
    marginTop: 7
  }

  const namecol = {
    flexDirection: 'column',
  alignItems: 'center',
  width: '64%'
}

  const video = {
    width: '90%', 
    height: 0.35*screenHeight, 
    alignSelf: 'center'
  }

  const bottom = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 15
  }

  const lines = {
    flex: 1, 
    height: 2,
    borderRadius: 1, 
    backgroundColor: '#F3831E',
    width: screenWidth*0.1
  }

  const dtext = {
    marginHorizontal: 10,
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.027,
  }

  const quantity = {
    color: '#ffffff',
    backgroundColor: '#F3831E',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.037,
  textAlign: 'center',
  width: '50%',
  padding: 15,
  borderRadius: 10,
  marginTop: 0.03*screenHeight
  };

  const setsstyle = {
    color: '#ffffff',
    backgroundColor: '#F3831E',
  fontFamily: 'LeagueSpartan-SemiBold',
  fontSize: screenAverage*0.037,
  textAlign: 'center',
  width: '50%',
  padding: 15,
  borderRadius: 10,
  };

  const describt = {
    color: '#ffffff',
  fontFamily: 'LeagueSpartan-Regular',
  fontSize: screenAverage*0.026,
  textAlign: 'left',
  width: '80%'
  };

  const clicked = () => {
    console.log("Clicked back");
    const routes = navigation.getState()?.routes;
    if (index == 0 && set == 0 && routes[routes.length - 2] != 'SuccessN'){
      navigation.goBack();
    }
    else {
      if(set == 0){
      navigation.navigate('SuccessN',{exercises: exercises, index: index-1,set:0});
    }
    else{
      navigation.navigate('Cameras',{exercises: exercises, index: index, set: set-1});
    }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    getdocs();
    if (vR.current) {
      vR.current.playAsync();
    }

    const unsubscribeBlur = navigation.addListener('blur', () => {
      if (vR.current) {
        vR.current.stopAsync();
      }
    });

    return () => {
      unsubscribeBlur();
    };
  }, [navigation,set,index])
  );

  if (!isLoaded) {
    return (<Loading />);
  }

  return (
    <View style={background}>
            <ScrollView contentContainerStyle={{flexGrow: 1,alignItems: 'center'}}>
      
            <View style={row}>
            <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>
            <View style={namecol}>
            <Text style={tname}>{exname}</Text>
            <View style={line} />
            </View>
            </View>
      <Video ref={vR} source={{uri: url}} style={video} isLooping shouldPlay={true} resizeMode={ResizeMode.CONTAIN}/>

      <Text style={setsstyle}>{'Sets: ' + (set+1) + '/' + sets}</Text>

      <Text style={quantity}>{qtext}</Text>

      <View style={bottom}>

        <View style={lines} />

        <Text style={dtext}>Exercise description</Text>

        <View style={lines} />

      </View>

      <Text style={describt}>{describtion}</Text>

      <TouchableOpacity onPress={handleTouchStart} style={nextbutton}><Text style={nbts}>Next</Text></TouchableOpacity>

      </ScrollView>
        </View>
  ); 

//Add later <Text style={warning}>Email is invalid, or isn't registered.</Text>
//Add to video  onLoad={onLoad} onLoadStart={onLoadStart}

}

export default Exercise;