import React from 'react';
import { View,Dimensions, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from '@use-expo/font';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState} from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import {getFirestore, getDoc, doc} from 'firebase/firestore'
import Loading from './Loading';

initializeApp(firebaseConfig);

const base = getFirestore();

function Training() {

    const route = useRoute();
    const { tid } = route.params;
    const [name, setName] = useState('');
    const [describtion, setDescribtion] = useState('');
    const [exercises, setExercises] = useState('');
    const [exnames, setNames] = useState('');
    
    const getdocs = async () =>{
        try {
        const docRef = doc(base, "Training",tid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setDescribtion(docSnap.data().describtion);
        setExercises(docSnap.data().exercises);

      } else {
        console.log("No such document!");}}
        catch (error) {
          console.error('Error getting doc:', error);
      }}   

      const getnames = async () => {
        try {
          const names = [];
          for (const id of ids) {
            const docRef = doc(base, "Exercises", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const name = docSnap.data().name;
              names.push(name);
            } else {
              console.log("Document not found for ID:", id);
            }
          }
          setNames(names);
        } catch (error) {
          console.error('Error getting documents:', error);
        }
      };
      

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
        height: "100%",
        width: '100%',
        left: 0,
        top: 0,
        flex: 1
      };

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

      const lines = { 
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

    const bottom = {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: screenHeight*0.01,
        padding: 15
      }
    
      const line = {
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

      const descript = {
        color: '#ffffff',
      fontFamily: 'LeagueSpartan-Regular',
      fontSize: screenAverage*0.026,
      textAlign: 'left',
      width: '80%',
      marginLeft: screenWidth*0.1
      };

      const blobstyle = {
        backgroundColor: '#F3831E',
        height: 0.17*screenHeight,
        borderRadius: 30,
        width: '90%',
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

      const ids = [];
        const quants = [];

Object.values(exercises).forEach(item => {
  ids.push(item.id);
  quants.push(Object.keys(item.quant).length);
});

      const clicked = () => {
        console.log('Clicked Back');
        navigation.goBack();
      }

      useEffect(() => {
        getdocs();
        getnames();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }, []);

    if (!isLoaded) {
        return(<Loading/>);
      }
    

  return (
        <View style={background}>
            <ScrollView style={{flexGrow: 1}}>
                <View style={row}>
            <TouchableOpacity onPress={clicked}><Image source={require('../assets/back.png')} style={backbutton}/></TouchableOpacity>
            <View style={namecol}>
            <Text style={tname}>{name}</Text>
            <View style={lines} />
            </View>
                </View>
                <View style={bottom}>
                <View style={line} />

                <Text style={dtext}>Training description</Text>

                <View style={line} />
                </View>
                <Text style={descript}>{describtion}</Text>
                {exnames.map((value, index) => (
        <TouchableOpacity key={index} style={blobstyle} onPress={clicked} ><Text style={textstyle}>{value}</Text></TouchableOpacity>
      ))}
            </ScrollView>
        </View>
  );
}

export default Training;