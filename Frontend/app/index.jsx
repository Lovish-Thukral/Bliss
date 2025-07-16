import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../components/UIComponents/Applogo.jsx";
import axiosInstance from '../utils/axiosInstance.js';


const verifyToken = async () => {
   const res = await axiosInstance.post('/user/TokenAuthController')
    const { user } = res.data
    console.log(user)
}

export default function Index() {


  useEffect(
    verifyToken
  , [])

  return (

    <View className="  bg-pink-50 flex-1 items-center justify-center">
      <View className=" p-4 w-[70vw] h-[50vh]">
        <Logo />
      </View>
    </View>

  );
}
