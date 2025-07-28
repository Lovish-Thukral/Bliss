"use client";
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../../../components/UIComponents/BottomNav';
import ProfileHeader from '../../../components/UIComponents/ProfileHeader';
import { Followbtn } from '../../../components/UIComponents/Followbtn';
import FollowEditbtn from '../../../components/UIComponents/stylingComponents/FollowEditbtn';
import { useSelector } from 'react-redux';
import ViewPostsSection from '../../../components/UIComponents/ViewPostsSection';


const ProfilePage = () => {
  const selector = useSelector((state) => state.userData.following);
  const { username } = useLocalSearchParams();
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://bliss-7r87.onrender.com/api/user/userprofile/${username}`);
        setUserData(res.data);

      } catch (error) {
        console.log('Full error:', error);

      } finally {
        setLoading(false)
      }
    };

    if (username) fetchProfile();
  }, []);

  useEffect(() => {
    const backAction = () => {
      router.replace('/searchPage');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const canmessage = (selector.includes(userData._id))

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
        postLength={userData.posts}
      />

      <View className="flex-row justify-evenly mb-5 pr-6 pl-2">
        <View className="w-1/2 items-center mx-1">
          <Followbtn
            userID={userData._id}
          />
        </View>
        <View className="w-1/2 items-center mx-1">
          {canmessage ? (
            <FollowEditbtn textval={'Message'} onpress={ () => router.push(`/DynamicRoutes/chattingPage/${userData._id}`)} />
          ) : null}
        </View>
      </View>

      <ScrollView>

        {userData.posts.length === 0 ? (
          <View className="bg-gray-100 p-6 rounded-lg mb-20">
            <Text className="text-center text-gray-400">No posts yet...</Text>
          </View>
        ) : (
          <View>
            <ViewPostsSection posts={userData.posts}/>
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

export default ProfilePage;
