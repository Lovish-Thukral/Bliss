import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../components/UIComponents/Applogo.jsx";
import UserDataUpdate from "../config/UserDataUpdate.js"
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateData } from "@/components/reduxComponents/UserDataSlice.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";





export default function Index() {


  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      try {
        const data = await UserDataUpdate();
        console.log(data)
        if (!data) {
          await AsyncStorage.removeItem('token');
          router.replace('./login')
          return
        }

        dispatch(updateData(data))
        router.replace('./homepage')
      } catch (error) {
        console.log(error),
          router.replace('login')
      }

    })();
  }, []);

  return (

    <View className="  bg-pink-50 flex-1 items-center justify-center">
      <View className=" p-4 w-[70vw] h-[50vh]">
        <Logo />
      </View>
    </View>

  );
}
