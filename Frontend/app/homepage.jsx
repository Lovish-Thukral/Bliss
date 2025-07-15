import { useRouter } from 'expo-router'
import { Image, View, TouchableOpacity, Text } from 'react-native'


function homepage() {
  const router = useRouter();
  return (

        <View className="bg-pink-50 flex-1 items-center pt-10 relative ">
        <View className="flex-1 flex-row w-[90vw] h-[50px] justify-evenly" >
            <Image
            className = "h-[80px] w-[120px] "
            source={require('../assets/images/applogo.webp')}/>
            
            </View>   
            
      <TouchableOpacity
        className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-6 shadow-lg"
        onPress={() => router.push('/ProfilePage')}
        >
        <Text className="text-white font-semibold text-base">Login to Continue</Text>
      </TouchableOpacity>
        
        </View>
  )
}

export default homepage