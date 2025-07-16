import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../components/UIComponents/Applogo.jsx";
import axiosInstance from '../utils/axiosInstance.js';
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "@/components/reduxComponents/UserDataSlice.jsx";



const verifyToken = async () => {
  try {
    const res = await axiosInstance.post('/user/TokenVerify')
    const { user } = res.data
    console.log(user)
    return user

  } catch (error) {
    console.log(error)
  }
}

export default function Index() {


  useEffect(() => {
    (async () => {
      const data = await verifyToken();
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
