"use client";
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { BackHandler, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/UIComponents/BackButton';
import axiosInstance from '../utils/axiosInstance';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultlist, setResultList] = useState([]);
  const [query, setquery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setquery(searchQuery.trim());
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const backAction = () => {
      router.replace('/homepage'); 
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // cleanup
  }, []);

  useEffect(() => {
    const searchUser = async () => {
      if (query.length < 2) {
        return;
      }

      try {
        const res = await axiosInstance.post('/user/listuser', {
          username: query,
        });
        setResultList(res.data.userlist || []);
      } catch (error) {
        console.log('axios error', error);
      }
    };

    searchUser();
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <BackButton />

      {/* Search Bar */}
      <View className="flex-row items-center bg-white mx-4 px-4 pb-3 rounded-full shadow-md">
        <Search color="gray" size={20} />
        <TextInput
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="ml-3 flex-1 text-gray-700"
        />
      </View>

      <ScrollView className="px-4">
        {resultlist.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">No users found...</Text>
        ) : (
          resultlist.map((user, index) => (
            <TouchableOpacity
              key={user._id || index}
              className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-sm"
              onPress={() => {
                router.push(`/DynamicRoutes/viewProfile/${user.username}`)
              }}
            >
              <Image
                source={{ uri: user.profilepic || 'https://via.placeholder.com/150' }}
                className="w-12 h-12 rounded-full bg-gray-300"
              />
              <View className="ml-4">
                <Text className="text-base font-semibold text-gray-800">{user.username}</Text>
                <Text className="text-sm text-gray-500">{user.name}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
