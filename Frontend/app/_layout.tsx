import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const [isloaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (isloaded) {
      router.replace("/login");
    }
  }, [isloaded, router]);

  return (
    <Stack screenOptions={{
      headerShown : false
    }}>
     
    </Stack>
  );
}
