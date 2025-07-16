import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Provider } from "react-redux";
import storage from '../config/reduxConfig.js'
import "./global.css";

export default function RootLayout() {
  // const router = useRouter();
  // const [isloaded, setIsLoaded] = useState(false);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // React.useEffect(() => {
  //   if (isloaded) {
  //     router.replace("/homepage");
  //   }
  // }, [isloaded, router]);

  return (
    <Provider store={storage} >
    <Stack screenOptions={{
      headerShown : false
    }}>
     
    </Stack>
    </Provider>
  );
}
