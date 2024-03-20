import React, { useEffect} from 'react';
import { View, Dimensions, Image} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'

const Loading = () => {
    const screenWidth = Dimensions.get('window').width
    const logo = {
        width: 231,
        height: 45,
        marginLeft: 17,
        position: 'absolute'}

        useEffect(() => {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }, []);
        
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center' }}>
      <Image source={require('../assets/Logo.png')} style={logo}/>
    </View>
  );
};

export default Loading;