"use client";
import { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Text, ScrollView, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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
      <View className="flex-row justify-center pt-10 mb-4">
        <Image
          className="h-[80px] w-[120px]"
          source={require('../assets/images/applogo.webp')}
        />
      </View>

      <View className="items-center">
        <TouchableOpacity
          className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-6 shadow-lg"
          onPress={() => router.push('UserProfilePage')}
        >
          <Text className="text-white font-semibold text-base">Login to Continue</Text>
        </TouchableOpacity>
      </View>
      
      <BottomNav 
      router = {router}
      />
      
    </SafeAreaView>
  );
};

export default Homepage;
