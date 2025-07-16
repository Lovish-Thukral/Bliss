"use client";
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageUp, Fence } from 'lucide-react-native'


const ProfilePage = () => {
    const [userData, setUserData] = useState({
        
    });


    return (
        <SafeAreaView className={`flex bg-pink-50`}>

            <View className="flex-1 flex-row px-4 relative bg-black mb-12">
               <Text className = "text-xl font-semibold text-gray-800 absolute left-4" >
                @{userData.username}
               </Text>
                <TouchableOpacity className = "absolute right-20 text-xl">
                    <ImageUp></ImageUp>
                </TouchableOpacity>

                <TouchableOpacity className = "absolute right-8 text-xl">
                    <Fence> </Fence>
                </TouchableOpacity>
            </View>
            <ScrollView className = "px-6">

                <View className="flex-row items-center justify-between mb-1">
                    <Image
                        source={{ uri: userData.profilePic }}
                        className="w-24 h-24 rounded-full border border-pink-500 "
                    />
                    <View className="flex-row justify-between flex-1 ml-6">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.posts}</Text>
                            <Text className="text-xs text-gray-500">Posts</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.followers}</Text>
                            <Text className="text-xs text-gray-500">Followers</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{userData.following}</Text>
                            <Text className="text-xs text-gray-500">Following</Text>
                        </View>
                    </View>
                </View>

                <Text className="text-base font-semibold text-gray-800">{userData.name}</Text>
                <Text className="text-sm text-gray-600 mb-3">{userData.bio}</Text>
            <View className = "flex-1 flex-row justify-evenly w-[40vw] gap-5">
                <TouchableOpacity className="border border-pink-500 rounded-full py-2 items-center mb-5 w-full">
                    <Text className="text-pink-500 font-semibold">Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-pink-500 rounded-full py-2 items-center mb-5 w-full">
                    <Text className="text-pink-500 font-semibold">Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className = "bg-black h-full w-full flex-1">

            </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfilePage;
