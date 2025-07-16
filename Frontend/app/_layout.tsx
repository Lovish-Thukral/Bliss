import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Provider } from "react-redux";
import storage from '../config/reduxConfig.js'
import "./global.css";

export default function RootLayout() {
 
  return (
    <Provider store={storage} >
    <Stack screenOptions={{
      headerShown : false
    }}>
     
    </Stack>
    </Provider>
  );
}
