import axios from 'axios';
import { useState } from 'react';
import { Image, Text, TextInput, Vibration, View } from 'react-native';
import BackButton from '../../components/UIComponents/BackButton';
import Continuebtn from '../../components/UIComponents/Continuebtn';

function EnterName() {
  const [emailVal, setemailVal] = useState('');
  const [Hide, setHide] = useState(false);

  const fallbackEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validmail = async (email) => {
    const valid = fallbackEmailRegex.test(email);
    setHide(!valid);
    if (!valid) {
      Vibration.vibrate(50);
      return valid;
    }
    return true;
    }; 

    const checkFun = async () => {
      return await validmail(emailVal);
    };

    return (
      <View className="bg-pink-50 flex-1 items-center pt-10 relative">
        <BackButton />
        <Text className="text-2xl font-bold text-center text-gray-900">Email Address</Text>
        <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
          We'll Need your email to stay in touch
        </Text>
          <View className="self-center items-center w-[80vw]">

        <TextInput
          className="bg-white px-7 w-[325px] h-[56px] rounded-3xl m-2"
          placeholder="Enter Your Email"
          keyboardType="email-address"
          value={emailVal}
          onChangeText={setemailVal}
          autoCapitalize="none"
          />

        <Text className={`text-red-500 font-semibold text-xs mb-6 text-center ${Hide ? '' : 'hidden'}`}>
          * Please Enter a Valid Email
        </Text>

        <Continuebtn
          nextpage="/SignupScreens/EnterName"
          checkFun={checkFun}
          patchtype="email"
          patchvalue={emailVal}
          />

          </View>
        <Image
          source={require('../../assets/images/arc2.png')}
          className="w-[95vw] h-max absolute bottom-0"
          resizeMethod="contain"
        />
      </View>
    );
  }

  export default EnterName;
