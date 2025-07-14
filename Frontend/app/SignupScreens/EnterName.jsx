import { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../components/UIComponents/BackButton';
import Continuebtn from '../../components/UIComponents/Continuebtn';

function EnterName() {

  const autoname = useSelector((state) => state.signupdetails.email)
  const [input, setinput] = useState(autoname.split('@')[0])
  const [hidden, setHidden] = useState(false)
  const checkFun = () => {
    if (input.trim() == "" || input.length <= 3) {
      setHidden(true)
      return false;
    }
    setHidden(false);
    return true
  }

  return (
    <View className="bg-pink-50 flex-1 items-center pt-10 relative">
      <BackButton />
      <Text className="text-2xl font-bold text-center text-gray-900">
        What's Your Name ?
      </Text>
      <Text className="text-sm text-center text-gray-600 mt-2 mx-16">
        Let's Get to Know Each Other
      </Text>
      <View className="self-center items-center w-[80vw]">

        <TextInput
          className="bg-white p-2 px-3 w-[325px] h-[56px] rounded-3xl m-2"
          placeholder='Enter Your Name'
          value={input}
          onChange={setinput}>
        </TextInput>

        <Continuebtn
          nextpage={"SignupScreens/EnterUsername"}
          checkFun={checkFun}
          patchtype="name"
          patchvalue={input}
        />

        <Text className={`text-red-500 font-semibold text-xs mb-6 text-center ${hidden ? '' : 'hidden'}`}>
          * Please Enter a Valid Name
        </Text>

      </View>
      <Image
        source={require('../../assets/images/arc2.png')}
        className="w-[95vw] h-max absolute bottom-0 "
        resizeMethod='contain'>
      </Image>
    </View>
  )
}

export default EnterName