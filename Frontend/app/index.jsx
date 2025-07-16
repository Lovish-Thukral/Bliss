import React, { useEffect } from "react";
import { View } from "react-native";
import Logo from "../components/UIComponents/Applogo.jsx";
import UserDataUpdate from "../config/UserDataUpdate.js"
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateData } from "@/components/reduxComponents/UserDataSlice.jsx";





export default function Index() {


  const router = useRouter()
  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      const data = await UserDataUpdate();
      if (!data) {
        alert("Session Expired")
        router.replace('./login')
        return
      }

      dispatch(updateData(data))
      router.replace('./homepage')
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
