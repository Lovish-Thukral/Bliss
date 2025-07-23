"use client";
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { BackHandler, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/UIComponents/BackButton';
import UserList from '../components/UIComponents/UserList';
import axiosInstance from '../utils/axiosInstance';


const SearchPage = () => {
  const router = useRouter();
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

    return () => backHandler.remove();
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
      <View className="flex-row items-center bg-white mx-4 p-1.5 rounded-full shadow-md">
        <Search color="gray" size={20} className={'ml-3'} />
        <TextInput
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="ml-3 flex-1 text-gray-700"
        />
      </View>

      <UserList users={resultlist} />

    </SafeAreaView>
  );
};

export default SearchPage;
