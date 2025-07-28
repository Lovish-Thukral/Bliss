import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, BackHandler} from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import axios from 'axios';
import UserList from '../components/UIComponents/UserList';
import Logo from '../components/UIComponents/Applogo'

const ChatListPage = () => {
  const router = useRouter();
  const following = useSelector((state) => state.userData.following);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!following || following.length === 0) {
          setLoading(false);
          return;
        }

        const responses = await Promise.all(
          following.map((id) =>
            axios.post('https://bliss-7r87.onrender.com/api/user/listuser', {
              UserID: id,
            })
          )
        );

        const fetchedUsers = responses.map((res) => res.data);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>  { router.replace('/homepage') 
      return true
    });
    return () => backHandler.remove();
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500 text-lg">No chats yet</Text>
      </View>
    );
  }

  return (

    <ScrollView className="flex-1 bg-white pt-10">
      <View className="h-[10vh] w-max p-2 mb-7">
        < Logo />
      </View>
      <Text className="text-xl font-bold px-4 pb-2">Messages</Text>
      <UserList users={users} curruntclick={'message'} />
    </ScrollView>
  );
};

export default ChatListPage;
