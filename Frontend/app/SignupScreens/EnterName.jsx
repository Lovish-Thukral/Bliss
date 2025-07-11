import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import BackButton from '../../components/UIComponents/BackButton';

function EnterName() {

  const router = useRouter();

  return (
    <View className="bg-pink-50 flex-1 items-center pt-10 relative">
      <BackButton />
        <Text className="text-2xl font-bold text-center text-gray-900">
          What's Your Name ?
        </Text>
        <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
          Let's Get to Know Each Other
        </Text>
        <TextInput
          className="bg-white p-2 px-3 w-[325px] h-[56px] rounded-3xl m-2"
          placeholder='Enter Your Name'>
        </TextInput>
        <TouchableOpacity
          className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-5 shadow-lg"
          onPress={() => router.push('/SignupScreens/EnterEmail')}
        >
          <Text className="text-white font-semibold text-base w-[50vw] text-center"> Continue </Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/arc2.png')}
          className="w-[95vw] h-max absolute bottom-0 "
          resizeMethod='contain'>
        </Image>
      </View>
      )
}

      export default EnterName