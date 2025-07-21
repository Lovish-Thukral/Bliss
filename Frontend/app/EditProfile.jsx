import React from 'react' 
import BackButton from '../components/UIComponents/BackButton'
import { View, TouchableOpacity, Image, TextInput } from 'react-native'
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
   
    </SafeAreaView>
  )
}

export default EditProfile