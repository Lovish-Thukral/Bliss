"use client";
import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const FollowPage = ({Backbtn, followlist}) => {
  const [followers, setFollowers] = useState(followlist);

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <View className="flex-row items-center justify-between bg-pink-50 shadow-md">
        <TouchableOpacity onPress={() => Backbtn() }>
          <ArrowLeft color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-800">Followers</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="px-4 mt-4">
        {followers.length === 0 ? (
          <Text className="text-center text-gray-500 mt-20">No Connections yet...</Text>
        ) : (
          followers.map((follower, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-md"
              onPress={() => {}} // Add navigation later if needed
            >
              <Image
                src={follower.profilepic}
                className="w-12 h-12 rounded-full bg-gray-300"
              />
              <View className="ml-4">
                <Text className="text-base font-semibold text-gray-800">{follower.name}</Text>
                <Text className="text-sm text-gray-500">@{follower.username}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowPage;
