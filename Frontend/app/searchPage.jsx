"use client";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import axiosInstance from '../utils/axiosInstance';


const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(
    () => {
        const searchUser = async () => {
            const res = await axiosInstance.get()
        }
    }
  )


  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white mx-4 my-4 px-4 py-3 rounded-full shadow-md">
        <Search color="gray" size={20} />
        <TextInput
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="ml-3 flex-1 text-gray-700"
        />
      </View>

      {/* Suggested/Filtered Users */}
      <ScrollView className="px-4">
       
          <Text className="text-center text-gray-500 mt-10">No users found...</Text>

            <TouchableOpacity
            //   key={index}
              className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-sm"
              onPress={() => {}}
            >
              <Image
                // src={user.profilepic}
                className="w-12 h-12 rounded-full bg-gray-300"
              />
              <View className="ml-4">
                <Text className="text-base font-semibold text-gray-800"></Text>
                <Text className="text-sm text-gray-500"> </Text>
              </View>
            </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
