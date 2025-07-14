import { useRouter } from 'expo-router';
import { Phone } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LoginImage from '../assets/images/loginPic.png';


export default function LoginScreen() {
  const router = useRouter();

  return (
    <View  className="flex-1 items-center justify-between bg-pink-50 px-6 pt-6 pb-52">
      <View className="items-center mt-5 h-[10vh] w-[70vw]">
        <Image
         source={require('../assets/images/applogo.webp')}
         className="w-full h-full"
         resizeMode="contain">
        </Image>
      </View>

      <View className="items-center relative p-4 h-[50vh] w-[90vw]">
        <Image
          source={LoginImage}
          className="w-full h-full rounded-lg"
          resizeMode="contain"
          />
      </View>

      <View className="px-4 mt-4">
        <Text className="text-xl font-bold text-center text-gray-900">
          "Not Just an App — It's A Shared Life Journey"
        </Text>
        <Text className="text-sm text-center text-gray-600 mt-2">
          Join us to deepen your bond and keep the spark alive in your shared journey.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-6 shadow-lg"
        onPress={() => router.push('/login')}
        >
        <Phone color="white" size={20} className="mr-2" />
        <Text className="text-white font-semibold text-base">Login with Phone</Text>
      </TouchableOpacity>

      <View className="mt-4 flex-row">
        <Text className="text-gray-600">Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text className="text-pink-500 font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
        </View>
  );
}
