import React from 'react' 
import BackButton from '../components/UIComponents/BackButton'
import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Check } from 'lucide-react-native'

function EditProfile() {
  return (
    <SafeAreaView >
        <View className = "relative"> 
            <BackButton />
            <TouchableOpacity className = "top-0 absolute right-5">
                < Check  className = "text-pink-500"/>
            </TouchableOpacity>
        </View>
    <View className="px-4">
      {/* Profile Picture */}
      <View className="items-center mt-4 mb-6">
        <TouchableOpacity onPress={''}>
          <Image source={''} className="h-24 w-24 rounded-full" />
        </TouchableOpacity>
        <TouchableOpacity onPress={''}>
          <Text className="text-blue-400 mt-2 text-sm font-medium">
            Change profile picture
          </Text>
        </TouchableOpacity>
      </View>

      {/* Name */}
      <View className="mb-4">
        <Text className="text-gray-400 text-sm mb-1">Name</Text>
        <TextInput

          className="border border-gray-700 text-white px-4 py-3 rounded-xl"

        />
      </View>

      {/* Username */}
      <View className="mb-4">
        <Text className="text-gray-400 text-sm mb-1">Username</Text>
        <TextInput
          className="border border-gray-700 text-white px-4 py-3 rounded-xl"
        />
      </View>

      {/* Bio */}
      <View className="mb-2">
        <Text className="text-gray-400 text-sm mb-1">Bio</Text>
        <TextInput
          className="border border-gray-700 text-white px-4 py-3 rounded-xl"
        />
      </View>
    </View>

    </SafeAreaView>
  )
}

export default EditProfile