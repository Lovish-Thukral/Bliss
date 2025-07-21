import { Stack } from "expo-router";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import storage from '../config/reduxConfig.js'
import "./global.css";

export default function RootLayout() {
 
  return (
    <PaperProvider>
    <Provider store={storage} >
    <Stack screenOptions={{
      headerShown : false
    }}>
     
    </Stack>
    </Provider>
      </PaperProvider>
  );
}
