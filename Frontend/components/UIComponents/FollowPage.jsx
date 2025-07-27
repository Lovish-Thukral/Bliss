"use client";
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import axios from 'axios';
import UserList from './UserList'

const FollowPage = ({ Backbtn, followlist }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        if (followlist.length < 0) return
        const responses = await Promise.all(
          followlist.map((id) =>
            axios.post("https://bliss-7r87.onrender.com/api/user/listuser", {
              UserID: id,
            })
          )
        );

        const users = responses.map((res) => res.data);
        setFollowers(users);
      } catch (error) {
        console.error("Error fetching follower data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (followlist?.length > 0) {
      fetchFollowers();
    } else {
      setLoading(false);
    }
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <View className="flex-row items-center justify-between bg-pink-50 shadow-md px-4 py-2">
        <TouchableOpacity onPress={Backbtn}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Followers</Text>
        <View className="w-6" />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Loading followers...</Text>
        </View>
      ) : (
        <UserList users={followers} />
      )}
    </SafeAreaView>
  );
};

export default FollowPage;
