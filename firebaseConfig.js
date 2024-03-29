import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig =  {
  apiKey: "AIzaSyClQp58USCN-qqt1jC3v1Bc1T3Mzhbl1Mk",
  authDomain: "outexalpha.firebaseapp.com",
  projectId: "outexalpha",
  storageBucket: "outexalpha.appspot.com",
  messagingSenderId: "954820595861",
  appId: "1:954820595861:web:42625bc39e9a2d658c4b9c",
  measurementId: "G-WTDDJMJXJV",
  databaseURL: ""
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default firebaseConfig;