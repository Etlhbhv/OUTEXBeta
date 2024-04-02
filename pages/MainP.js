import React from 'react';
import { View,Dimensions, Text, Image, ScrollView } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useEffect, useState} from 'react';
import { getAuth} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc,getDocs , collection} from 'firebase/firestore'
import Loading from './Loading';

initializeApp(firebaseConfig);

const auth = getAuth();
const base = getFirestore();

function MainP() {
    const uid = auth.currentUser?.uid;
    const [namesb, setNamesB] = useState([]);
    const [tids, setTid] = useState('');
        
    const getdocs = async () =>{
        try {
        const querySnapshot = await getDocs(collection(base, 'Training'));
        const tidss = querySnapshot.docs.map(doc => doc.id);
        setTid(tidss);
        const names = querySnapshot.docs.map(doc => doc.data().name);
        setNamesB(names);
        const docRef = doc(base, "User",uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().username);
      } else {
        console.log("No such document!");}}
        catch (error) {
          console.error('Error getting doc:', error);
      }}
      
      const [username, setName] = useState('');

    const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width
  const screenAverage = (screenWidth+(2*screenHeight))/3;
  const [isLoaded] = useFonts({
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf')
    });

    const background = {
        backgroundColor: '#2A2B30',
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        flex: 1
      };

      const textrp = {
    color: '#ffffff',
      fontFamily: 'LeagueSpartan-SemiBold',
      fontSize: screenAverage*0.035,  
      width: '60%',
      textAlign:'center',
      marginLeft: screenWidth*0.2,
      marginTop: screenHeight*0.01
      };

      const backbutton = {
        width: screenWidth*0.16,
        height: screenWidth*0.16,
      }

      const blobstyle = {
        backgroundColor: '#F3831E',
        height: 0.17*screenHeight,
        borderRadius: 30,
        width: 0.9*screenWidth,
        left: 0,
        top: 0,
        borderWidth: 15,
        borderColor: '#2A2B30'
    }
    const textstyle = {
        fontFamily: 'LeagueSpartan-SemiBold',
      fontSize: screenAverage*0.04,
      textAlign: 'left',  
      alignSelf: 'center',
      width: '80%',
      marginTop: (screenHeight*0.085) - screenAverage*0.05
    }

      const clicked = () => {
        console.log('Clicked Profile');
        navigation.navigate("Profile");
      }

      const train = async (index) => {
        console.log('Clicked Training');
        await navigation.navigate("Training",{tid: tids[index]});
      }

      const column ={
        flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    flexGrow: 1
      }

      const row = {
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: "",
        width: '100%',
        marginTop: 0.05*screenHeight
      }

      useEffect(() => {
        getdocs();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }, []);

    if (!isLoaded) {
        return(<Loading/>);
      }
    

  return (
        <View style={background}>
            <ScrollView removeClippedSubviews={false} scrollEnabled={true} contentContainerStyle={column}>
              <View style={row}>
            <Text style={textrp}>{username}</Text>
            <TouchableOpacity onPress={clicked}><Image source={require('../assets/Profile.png')} style={backbutton}/></TouchableOpacity>
            </View>
            {namesb.map((value, index) => (
        <TouchableOpacity key={index} style={blobstyle} onPress={() => train(index)} ><Text style={textstyle}>{value}</Text></TouchableOpacity>
      ))}
      </ScrollView>
        </View>
  );
}

export default MainP;