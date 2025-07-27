import { Flag, ImageUp } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View, BackHandler, ActivityIndicator } from 'react-native'
import pickImage from '../../utils/ImagepickerUtil'
import axiosInstance from '../../utils/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UploadImage() {
  const [imageUri, setImageUri] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [disable, makedisable] = useState(false)

  const pickImg = async () => {
    const imgdata = await pickImage()
    setImageUri({
      imageUri: imgdata.imageUri,
      name: imgdata.name,
      type: imgdata.type
    })
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setImageUri(null)
    setDescription('')
    setLocation('')
    makedisable(false)
  }

  const handleSubmit = async () => {
    if (!imageUri) return
    makedisable(true)
    const form = new FormData()
    form.append('image', {
      uri: imageUri.imageUri,
      name: imageUri.name,
      type: imageUri.type
    })
    form.append('description', description)
    form.append('location', location)
    try {
      const token = await AsyncStorage.getItem('token')
      console.log(token)
      const response = await fetch(
        `http://192.168.1.9:8000/api/post/postUpload`,
        {
          method: 'POST',
           headers: {
            Authorization: `Bearer ${token}`
          },
          body: form
        }
      )
      const res = await response.json()
      console.log(res)
    } catch (error) {
      console.error(error)
    } finally {
      closeModal()
    }
  }

  useEffect(() => {
    let backHandler
    if (modalVisible) {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        setModalVisible(false)
        return true
      })
    }
    return () => backHandler?.remove()
  }, [modalVisible])

  return (
    <View>
      <TouchableOpacity onPress={pickImg}>
        <ImageUp color="black" />
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View className="flex-1 justify-center bg-black/50">
          <View className="m-8 bg-pink-50 rounded-xl p-6 shadow-lg">
            {imageUri && (
              <Image
                source={{ uri: imageUri.imageUri }}
                className="w-full h-64 mb-4 rounded-lg border border-pink-200"
                resizeMode="contain"
              />
            )}
            <TextInput
              placeholder="Enter Description"
              placeholderTextColor="#9ca3af"
              value={description}
              onChangeText={setDescription}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-base"
              multiline
            />
            <TextInput
              placeholder="Enter Location"
              placeholderTextColor="#9ca3af"
              value={location}
              onChangeText={setLocation}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-base"
            />
            <TouchableOpacity
              className="w-full bg-pink-500 py-3 rounded-lg items-center mb-3 shadow"
              onPress={handleSubmit}
              disabled={disable}
            >
              {disable ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-base">Submit</Text>
              )}
            </TouchableOpacity>
            <Pressable onPress={closeModal} className="w-full py-3 items-center">
              <Text className="text-pink-500 font-bold text-base">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}
