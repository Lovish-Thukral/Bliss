import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Vibration} from 'react-native';
import BackButton from '../components/BackButton.jsx';


function signup() {
  const [phoneVal, setphoneVal] = useState('')
  const [setHide, makeHid] = useState(false)
  const checkPhone = (phoneVal) => {
    if(phoneVal.length !== 10) {
      makeHid(true);
      Vibration.vibrate(50)
      setphoneVal('')
    }
    else{
      router.push('SignupScreens/EnterEmail')
    }
  }

  const router = useRouter()
  return (
    <View className="bg-pink-50 flex-1 items-center pt-10 relative">
      <BackButton />
      <Text className="text-2xl font-bold text-center text-gray-900">
        My Number is
      </Text>
      <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
        We'll need your phone number to send an OTP for verification.
      </Text>
      <TextInput
        className="bg-white p-2 px-3 w-[325px] h-[56px] rounded-3xl m-2"
        placeholder='Enter Your Number'
        keyboardType='numeric'
        value={phoneVal}
        onChangeText={setphoneVal}>

      </TextInput>
      <Text className={`text-red-500 font-semibold text-xs mb-6 text-center ${setHide ? '' : 'hidden'}`}> * Please Enter a Valid Mobile Number</Text>
      <Text className="text-sm text-center text-gray-600 mx-16">
        You may receive WhatsApp Notification from us for security and login purposes.
      </Text>
      <TouchableOpacity
        className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-5 shadow-lg"
        onPress={() => checkPhone(phoneVal)}
      >
        <Text className="text-white font-semibold text-base w-[50vw] text-center"> Continue </Text>
      </TouchableOpacity>
      <Image
      source={require('../assets/images/arc.png')}
      className = "w-[95vw] h-max absolute bottom-0 "
      resizeMethod='contain'>

      </Image>
    </View>
  )
}

export default signup