import React from "react";
import { View } from "react-native";
import Logo from "../components/UIComponents/Applogo.jsx";

export default function Index() {

  

  return (

    <View className="  bg-pink-50 flex-1 items-center justify-center">
      <View className=" p-4 w-[70vw] h-[50vh]">
        <Logo />
      </View>
    </View>

  );
}
