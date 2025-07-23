import * as ImagePicker from 'expo-image-picker';
import { ImageUp } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Modal, Pressable, TextInput, TouchableOpacity, View } from 'react-native';

export default function UploadImage() {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const handleSubmit = () => {
    console.log({ imageUri, description, location });
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
    setImageUri(null);
    setDescription('');
    setLocation('');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => pickImage()}>
        <ImageUp color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <View className="flex-1 justify-center bg-black/50">
          <View className="m-8 bg-white rounded-xl p-6">
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                className="w-full h-64 mb-4 rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-base"/>

            <TouchableOpacity
              className="w-full bg-blue-500 py-3 rounded-lg items-center mb-3"
              onPress={() => handleSubmit}
            >
              <Text className="text-white font-bold text-base">Submit</Text>
            </TouchableOpacity>

            <Pressable
              onPress={closeModal}
              className="w-full py-3 items-center"
            >
              <Text className="text-red-500 font-bold text-base">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}