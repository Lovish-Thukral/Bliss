"use client";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/UIComponents/BottomNav';


const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
           
      <BottomNav router = {router}/>
      
    </SafeAreaView>
  );
};

export default Homepage;
