import axios from 'axios';
import { useState } from 'react';
import { Image, Text, TextInput, Vibration, View } from 'react-native';
import BackButton from '../../components/UIComponents/BackButton';
import Continuebtn from '../../components/UIComponents/Continuebtn';

function EnterName() {

  const [emailVal, setemailVal] = useState('')
  const [Hide, setHide] = useState('')

  const checkFun = async (email) => {
    try {
      const res = await axios.get(`https://www.disify.com/api/email/${email}`);
      if (res.data.format == false) {
        setHide(true);
        Vibration.vibrate(50)
        return false
      }
      res.data.format ? true : false
    }
    catch (err) {
      console.error('Disify error:', err.message);
      return false;
    }

  };

  return (

    <View className="bg-pink-50 flex-1 items-center pt-10 relative">
      <BackButton />
      <Text className="text-2xl font-bold text-center text-gray-900">
        Email Address
      </Text>
      <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
        We'll Need your email to stay in touch
      </Text>

      <TextInput
        className="bg-white p-2 px-3 w-[325px] h-[56px] rounded-3xl m-2"
        placeholder='Enter Your Name'
        keyboardType='email-address'
        value={emailVal}
        onChange={setemailVal}>

      </TextInput>
      <Text className={`text-red-500 font-semibold text-xs mb-6 text-center ${Hide ? '' : 'hidden'}`}> * Please Enter a Valid Email</Text>

      <Continuebtn
        nextpage='/SignupScreens/createPassword'
        checkFun={checkFun}
        patchtype="email"
        patchvalue={emailVal}
      />
      <Image
        source={require('../../assets/images/arc2.png')}
        className="w-[95vw] h-max absolute bottom-0 "
        resizeMethod='contain'>
      </Image>
    </View>
  )
}

export default EnterName