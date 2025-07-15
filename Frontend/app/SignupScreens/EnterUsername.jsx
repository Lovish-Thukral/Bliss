"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '../../components/UIComponents/BackButton';
import Continuebtn from '../../components/UIComponents/Continuebtn';

const EnterName = () => {
  const [isUsable, setIsUsable] = useState(false);
  const [input, setInput] = useState('');
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const checkFun = () => {
    
    const inn = input.trim();
    const hasSpace = /\s/.test(inn);
    if (inn.length < 5 || hasSpace) {
      setHidden(true);
      return false;
    }
    setHidden(false);
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      const username = input.trim().toLowerCase();
      if (username.length < 5 || /\s/.test(username)) {
        setIsUsable(false);
        return;
      }
      try {
        const res = await axios.post('https://bliss-3ucs.onrender.com/api/user/checkusername', {
          username,
        });
        setIsUsable(res?.data?.status === false);
      } catch (error) {
        console.error("Error checking username availability:", error);
        setIsUsable(false);
      }
    };

    fetchData();
  }, [input]);

  useEffect(() => {
    if (isUsable && input.length > 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isUsable, input]);

  return (
    <View className="bg-pink-50 flex-1 items-center pt-10 relative">
      <BackButton />
      <Text className="text-2xl font-bold text-center text-gray-900">
        Enter a Unique Username
      </Text>
      <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
        Time to pick a username that's as unique as you are!
      </Text>
      <View className="self-center items-center w-[80vw]">
        <TextInput
          className="bg-white p-2 px-3 w-[325px] h-[56px] rounded-3xl m-2"
          placeholder="Enter Your Name"
          value={input}
          onChangeText={setInput}
        />
        {hidden && <Text className="text-red-500 font-semibold text-xs mb-6"> Username must be 5+ characters, no spaces </Text>}
        {isUsable && input.length > 4 && <Text className="text-green-500 font-semibold text-sm mb-6"> Username is available! </Text>}
        {!isUsable && input.length > 4 && <Text className="text-red-500 font-semibold text-sm mb-6"> Username is not available. </Text>}

        <Continuebtn
          nextpage="SignupScreens/CreatePassword"
          checkFun={() => checkFun}
          patchtype="username"
          patchvalue={input.toLowerCase()}
          isdisabled={disabled}
        />
      </View>
    </View>
  );
};

export default EnterName;
