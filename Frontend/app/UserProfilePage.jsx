"use client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Fence } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, RefreshControl, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import { updateData } from '../components/reduxComponents/UserDataSlice';
import BottomNav from '../components/UIComponents/BottomNav';
import ProfileHeader from '../components/UIComponents/ProfileHeader';
import FollowEditbtn from '../components/UIComponents/stylingComponents/FollowEditbtn';
import UploadImage from '../components/UIComponents/UploadImage';
import ViewPostsSection from '../components/UIComponents/ViewPostsSection';
import UserDataUpdate from '../config/UserDataUpdate';
import axiosInstance from '../utils/axiosInstance';

const UserProfilePage = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  
  const [sideMenu, showsideMenu] = useState(false);
  const [LogPopup, ShowLogPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [refreshing, setrefresh] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onRefresh = useCallback(() => {
    setrefresh(true);
  }, []);

  useEffect(() => {
    if (refreshing) {
      const refreshdata = async () => {
        try {
          const data = await UserDataUpdate();
          if (!data) {
            showSnackbar("Internet Error");
          } else {
            dispatch(updateData(data));
            showSnackbar("Content Refreshed");
          }
        } catch (error) {
          console.log(error);
          showSnackbar("Refresh failed");
        } finally {
          setrefresh(false);
        }
      };
      refreshdata();
    }
  }, [refreshing]);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const popUpBack = () => {
    if (LogPopup) {
      ShowLogPopup(false);
      return true;
    } else if (sideMenu) {
      showsideMenu(false);
      return true;
    } else {
      router.back();
      return true;
    }
  };

  const handleShare = async () => {
    try {
      const isShared = await Share.share({
        message: `Check out @${userData.username}'s profile on Bliss! 🌸\n${'hhttps://bliss-7r87.onrender.com/api/user/userprofile'}/${userData.username}`
      });
      if (isShared.action === Share.sharedAction) {
        showSnackbar("Profile shared!");
      }
    } catch (error) {
      showSnackbar("Failed to share profile.");
    }
  };

  const handleLogout = async () => {
    ShowLogPopup(false);
    setloading(true);
    try {
      const LogoutRes = await axiosInstance.post('/user/logout');
      if (LogoutRes.data.message === "logout successful") {
        await AsyncStorage.removeItem('token');
        router.replace('login');
      } else {
        showSnackbar("Logout failed. Try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      showSnackbar("Logout error occurred.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", popUpBack);
    return () => backHandler.remove();
  }, [sideMenu, LogPopup]);

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <View className="flex-1">
        <View className={`${sideMenu ? "flex" : "hidden"} bg-pink-50 h-[100vh] w-[100vw] absolute top-0 right-0 z-50 px-8 shadow-md`}>
            <View className="absolute">
              <TouchableOpacity onPress={() => {showsideMenu(false)}}>
                <Text className="text-base text-pink-500 mb-4 left-5 top-3"> {'< Back'} </Text>
              </TouchableOpacity>
            </View>
            <Text className="text-lg font-bold text-pink-500 mb-6 mt-12">Menu</Text>
            <TouchableOpacity onPress={() => { router.push('/settings'); showsideMenu(false); }}>
              <Text className="text-base text-gray-700 mb-4">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { router.push('/help&support'); showsideMenu(false); }} >
              <Text className="text-base text-gray-700 mb-4">Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { ShowLogPopup(true); showsideMenu(false); }}>
              <Text className="text-base text-red-500">Log Out</Text>
            </TouchableOpacity>
          </View>
        <ScrollView 
          className="flex-1 z-20"
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={['#EC4899']}
              tintColor="#EC4899"
            />
          }
        >
          <ProfileHeader
            pic={userData.profilepic}
            follower={userData.followers}
            following={userData.following}
            bio={userData.bio}
            name={userData.name}
            username={userData.username}
            postLength={userData.posts}
          />

          

          <View className="flex-row gap-4 absolute top-[2.2vh] right-5 z-10">
            <View>
              <UploadImage />
            </View>
            <TouchableOpacity onPress={() => showsideMenu(!sideMenu)}>
              <Fence color="black" />
            </TouchableOpacity>
          </View>

          <View className="px-1 pt-4">
            <View className="flex-row justify-evenly pr-2">
              <View className="flex-1 mx-1">
                <FollowEditbtn
                  textval="Edit Profile"
                  onpress={() => router.push('/EditProfile')}
                  Bol={true}
                />
              </View>
              <View className="flex-1 mx-1">
                <FollowEditbtn
                  textval="Share Profile"
                  onpress={handleShare}
                  Bol={false}
                />
              </View>
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
        </ScrollView>

        <View className={`${LogPopup ? "flex" : "hidden"} absolute self-center top-1/2 bg-white shadow-xl shadow-black p-10 items-center space-y-2 rounded-xl border border-pink-500 border-opacity-10 border-0.5 z-30`}>
          <Text className="text-xl font-semibold text-gray-800">Logout Confirmation</Text>
          <Text className="text-sm text-gray-600 mb-5">Are You sure You Want To Log out ?</Text>
          <View className="flex-row justify-evenly self-center space-x-5 w-[80%]">
            <TouchableOpacity
              className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
              onPress={() => ShowLogPopup(false)}
              accessibilityLabel="Cancel Logout"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
              onPress={handleLogout}
              accessibilityLabel="Confirm Log out"
            >
              {loading ? (
                <ActivityIndicator color="pink" />
              ) : (
                <Text>Log out</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{
            zIndex: 20,
            bottom: 70,
            width: '80%',
            alignSelf: 'center',
            backgroundColor: '#fdf2f8',
          }}>
          {snackbarMessage}
        </Snackbar>
      </View>
      <BottomNav router={router} />
    </SafeAreaView>
  );
};

export default UserProfilePage;