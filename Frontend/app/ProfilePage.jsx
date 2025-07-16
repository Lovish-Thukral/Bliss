"use client";
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageUp, Fence } from 'lucide-react-native';
import { router } from 'expo-router';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance'


const ProfilePage = () => {
    const data = useSelector((state) => state.userData)
    const [userData, setUserData] = useState(data);



    //popup states 
    const [sideMenu, showsideMenu] = useState(false)
    const [LogPopup, ShowLogPopup] = useState(false)
    const [session, sessionout] = useState(false)
    const [loading, setloading] = useState(false)


    useEffect(
        () => {
            (
                async function logout() {
                    
                    try {
                        setloading(true)
                        const LogoutRes = await axiosInstance.post('/user/logout')
                        console.log(LogoutRes)
                        // const deleteToken = await AsyncStorage.removeItem('token')
                        setloading(false)
                    } catch (error) {
                        console.log(error)
                    }
                }
            )()
        }, [session]
    )






    return (
        <SafeAreaView className="flex-1 bg-pink-50 relative">
            <View className={`${sideMenu ? "flex" : "hidden"} bg-pink-50 h-[100vh] w-[75vw] absolute top-20 right-0 z-10 p-8 shadow-l-2xl `}>
                <Text className="text-lg font-bold text-pink-500 mb-6">Menu</Text>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Text className="text-base text-gray-700 mb-4">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/help')}>
                    <Text className="text-base text-gray-700 mb-4">Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => ShowLogPopup(!LogPopup)}>
                    <Text className="text-base text-red-500">LogPopup</Text>
                </TouchableOpacity>

            </View>
            <View className="flex-row px-4 py-4 items-center justify-between bg-pink-50 shadow-md z-20">
                <Text className="text-xl font-semibold text-gray-800">@{userData.username}</Text>
                <View className="flex-row gap-4">
                    <TouchableOpacity>
                        <ImageUp color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showsideMenu(!sideMenu)}>
                        <Fence color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className="px-6">
                <View className="flex-row items-center justify-between mb-4 mt-6 ">
                    <Image
                        src={userData.profilepic}
                        className="w-24 h-24 rounded-full border-4 border-pink-500 border-solid bg-black"
                    />
                    <View className="flex-row justify-between flex-1 ml-6">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.posts.length}</Text>
                            <Text className="text-xs text-gray-500">Posts</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.followers.length}</Text>
                            <Text className="text-xs text-gray-500">Followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.following.length}</Text>
                            <Text className="text-xs text-gray-500">Following</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-base font-semibold text-gray-800">{userData.name}</Text>
                <Text className="text-sm text-gray-600 mb-5">{userData.bio}</Text>

                <View className="flex-row justify-evenly gap-4 mb-5 self-center px-3">
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center">
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
                    LogPopup Confirmation
                </Text>
                <Text className="text-sm text-gray-600 mb-5">
                    Are You sure You Want To Log out ?
                </Text>
                <View className="flex-row justify-evenly self-center space-x-5 w-[80%]">
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center"
                        onPress={() => ShowLogPopup(!ShowLogPopup)}>
                        <Text> Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-pink-500 rounded-full py-2 w-1/2 items-center">
                        {
                        loading ? ( <ActivityIndicator color="pink" /> ) : ( <Text> Log out </Text> )
                            }
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ProfilePage;
