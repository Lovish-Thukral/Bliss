"use client";
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../../../components/UIComponents/BottomNav';
import ProfileHeader from '../../../components/UIComponents/ProfileHeader';

const ProfilePage = () => {
  const { userid } = useLocalSearchParams();
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://bliss-3ucs.onrender.com/api/user/userprofile/${userid}`);
        console.log(res.data)
        setUserData(res.data);
      } catch (error) {
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
        console.log('Full error:', error);

      } finally {
        setLoading(false);
      }
    };

    if (userid) fetchProfile();
  }, []);

  useEffect(() => {
      const backAction = () => {
        router.replace('/searchPage'); 
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); // cleanup
    }, []);
  

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-pink-50">
        <ActivityIndicator size="large" color="pink" />
      </SafeAreaView>
    );
  }

  if (!userData) {
    console.log("look", userData)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-pink-50">
        <Text className="text-gray-500">User not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <ProfileHeader
        pic={userData.profilepic}
        follower={userData.followers}
        following={userData.following}
        bio={userData.bio}
        name={userData.name}
        username={userData.username}
        postLength={userData.posts.length}
      />

      <ScrollView className="px-6">
        {/* Show user's posts or a placeholder if none */}
        {userData.posts.length === 0 ? (
          <View className="bg-gray-100 p-6 rounded-lg mb-20">
            <Text className="text-center text-gray-400">No posts yet...</Text>
          </View>
        ) : (
          <View className="mb-20">
            {/* Render posts here if needed */}
            {userData.posts.map((post, index) => (
              <View key={index} className="bg-white p-4 mb-4 rounded-xl shadow-sm">
                <Text>{post.caption}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

export default ProfilePage;
