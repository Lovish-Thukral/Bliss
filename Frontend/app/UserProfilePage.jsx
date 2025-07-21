"use client";
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, BackHandler, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageUp, Fence } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance'
import ProfileHeader from '../components/UIComponents/ProfileHeader';
import BottomNav from '../components/UIComponents/BottomNav';



const UserProfilePage = () => {
    const data = useSelector((state) => state.userData)
    const [userData, setUserData] = useState(data);



    //popup states 
    const [sideMenu, showsideMenu] = useState(false)
    const [LogPopup, ShowLogPopup] = useState(false)
    const [session, Setsessionout] = useState(false)
    const [loading, setloading] = useState(false)
    

    const popUpBack = () => {
        if (LogPopup) {
            ShowLogPopup(false)
            return true;
        } else if (sideMenu) {
            showsideMenu(false)
            return true
        }
        else {
            router.back()
            return true
        }
    }
    const handleShare = async () => {
        const isShared = await Share.share({
            message : `Check out @${username}'s profile on Bliss! 🌸\nhttps://bliss-3ucs.onrender.com/api/user/userprofile/${userData.username}`
        })
        if(isShared.action === Share.sharedAction ) {
            setTimeout(() => {
                
            }, 1000);
        }
    }



    useEffect(() => {
        const logout = async () => {
            if (session) {
                try {
                    setloading(true);
                    const LogoutRes = await axiosInstance.post('/user/logout');

                    if (LogoutRes.data.message === "logout successful") {
                        await AsyncStorage.removeItem('token');
                        router.replace('login');
                    } else {
                        console.log("Unexpected logout message:", LogoutRes.data.message);
                    }
                } catch (error) {
                    console.log("Logout error:", error);
                } finally {
                    setloading(false);
                }
            }
        };

        logout();
    }, [session]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", popUpBack);

        return () => backHandler.remove();
    }, [sideMenu, LogPopup]);


    return (
        <SafeAreaView className="flex-1 bg-pink-50 relative">
            <ProfileHeader
                pic={userData.profilepic}
                follower={userData.followers}
                following={userData.following}
                bio={userData.bio}
                name={userData.name}
                username={userData.name}
                postLength={userData.posts.length}
                router={router}
            />

            <View className={`${sideMenu ? "flex" : "hidden"} bg-pink-50 h-[100vh] w-[100vw] absolute top-24 right-0 z-10 p-8 shadow-l-2xl `}>
                <Text className="text-lg font-bold text-pink-500 mb-6">Menu</Text>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Text className="text-base text-gray-700 mb-4">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/help')}>
                    <Text className="text-base text-gray-700 mb-4">Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ShowLogPopup(!LogPopup)}>
                    <Text className="text-base text-red-500">Log Out</Text>
                </TouchableOpacity>
            </View>




            <View className="flex-row gap-4 absolute top-[7vh] right-5">
                <TouchableOpacity>
                    <ImageUp color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showsideMenu(!sideMenu)}>
                    <Fence color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView className="px-6">

                <View className="flex-row justify-evenly gap-4 mb-5 self-center px-3">
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
                    onPress={() => router.push('EditProfile')}>
                        <Text className="text-pink-500 font-semibold">Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center">
                        <Text className="text-pink-500 font-semibold">Share Profile</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-gray-100 p-6 rounded-lg mb-20">
                    <Text className="text-center text-gray-400">No posts yet...</Text>
                </View>
            </ScrollView>

            <View className={`${LogPopup ? "flex" : "hidden"} absolute self-center top-1/2 bg-white shadow-xl shadow-black p-10 items-center space-y-2 rounded-xl border border-pink-500 border-opacity-10 border-0.5 z-30`}>
                <Text className="text-xl font-semibold text-gray-800">
                    Logout Confirmation
                </Text>
                <Text className="text-sm text-gray-600 mb-5">
                    Are You sure You Want To Log out ?
                </Text>
                <View className="flex-row justify-evenly self-center space-x-5 w-[80%]">
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
                        onPress={() => ShowLogPopup(!ShowLogPopup)}>
                        <Text> Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
                        onPress={() => Setsessionout(true)}>
                        {
                            loading ? (<ActivityIndicator color="pink" />) : (<Text> Log out </Text>)
                        }
                    </TouchableOpacity>
                </View>

            </View>
            <BottomNav
                router={router}
            />
        </SafeAreaView>
    );
};

export default UserProfilePage;
