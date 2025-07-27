import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { View, TouchableOpacity, Image, Modal, Pressable, ActivityIndicator, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Check, SquarePen } from 'lucide-react-native'
import BackButton from '../components/UIComponents/BackButton'
import pickImage from '../utils/ImagepickerUtil'
import { Snackbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

function EditProfile() {
  const user = useSelector(state => state.userData)
  const router = useRouter()
  const [ProfileModal, OpenProfileModal] = useState(false)
  const [imageUri, setImageUri] = useState(null)
  const [disable, makedisable] = useState(false)
  const [snackVisible, setSnackVisible] = useState(false)

  const onInputClick = label => {
    router.push(`/DynamicRoutes/SubEditRoute/${label}`)
  }

  const pickImg = async () => {
    const imgdata = await pickImage()
    if (!imgdata) return
    setImageUri({
      imageUri: imgdata.imageUri,
      name: imgdata.name,
      type: imgdata.type
    })
    OpenProfileModal(true)
  }

  const closeModal = () => {
    OpenProfileModal(false)
    setImageUri(null)
    makedisable(false)
  }

  const uploadWithFetch = async () => {
    const data = new FormData()
    console.log(imageUri)
    data.append('image', {
      uri: imageUri.imageUri,
      name: imageUri.name,
      type: imageUri.type
    })

    try {
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(
        `http://192.168.1.9:8000/api/post/profileUpload`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data
        }
      )
      const json = await response.json()
      console.log(json)
      if (json.newProfilePicURL) {
        setSnackVisible(true)
      }
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      closeModal()
    }
  }


  const handleSubmit = async () => {
    if (!imageUri) return
    makedisable(true)
    await uploadWithFetch()
  }

  return (
    <SafeAreaView>
      <View>
        <BackButton />
        <TouchableOpacity className="top-0 absolute right-5">
          <Check className="text-pink-500" />
        </TouchableOpacity>
        <View className="relative mt-4 ">
          <Image
            source={{ uri: user.profilepic }}
            className="rounded-full h-[150px] w-[150px] self-center"
          />
          <TouchableOpacity
            className="absolute left-[57vw] bottom-1 bg-white rounded-full p-3"
            onPress={pickImg}
          >
            <SquarePen />
          </TouchableOpacity>
          <Modal animationType="slide" transparent visible={ProfileModal}>
            <View className="flex-1 justify-center bg-black/50">
              <View className="m-8 bg-pink-50 rounded-xl p-6 shadow-lg">
                <Text className="text-xl font-bold text-center text-gray-900 mb-3">
                  Please Confirm Your Update
                </Text>
                <View className="h-60 w-72">
                  <Image
                    source={{ uri: imageUri?.imageUri }}
                    className="w-52 h-52 border border-pink-200 rounded-full self-center"
                  />
                </View>
                <TouchableOpacity
                  className="w-full bg-pink-500 py-3 rounded-lg items-center mb-3 shadow"
                  onPress={handleSubmit}
                  disabled={disable}
                >
                  {disable
                    ? <ActivityIndicator color="white" />
                    : <Text className="text-white font-bold text-base">Submit</Text>
                  }
                </TouchableOpacity>
                <Pressable onPress={closeModal} className="w-full py-3 items-center">
                  <Text className="text-pink-500 font-bold text-base">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          duration={3000}
        >
          Profile picture updated successfully!
        </Snackbar>
        <View className="w-[95vw] self-center pt-7">
          <View className="border rounded-xl my-2 px-4 py-1">
            <TouchableOpacity onPress={() => onInputClick('username')}>
              <Text className="text-sm text-pink-500 font-bold">username</Text>
              <Text className="text-lg text-gray-700 font-medium">{user.username}</Text>
            </TouchableOpacity>
          </View>
          <View className="border rounded-xl my-2 px-4 py-1">
            <TouchableOpacity onPress={() => onInputClick('bio')}>
              <Text className="text-sm text-pink-500 font-bold">bio</Text>
              <Text className="text-lg text-gray-700 font-medium">{user.bio}</Text>
            </TouchableOpacity>
          </View>
          <View className="border rounded-xl my-2 px-4 py-1">
            <TouchableOpacity onPress={() => onInputClick('name')}>
              <Text className="text-sm text-pink-500 font-bold">name</Text>
              <Text className="text-lg text-gray-700 font-medium">{user.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile
