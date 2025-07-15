"use client";
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageUp, Fence } from 'lucide-react-native'
import Logo from "../components/UIComponents/Applogo"

const mockPosts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://source.unsplash.com/random/300x300?sig=${i + 1}`
}));

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        username: 'lovish_thukral',
        bio: 'Building the future one app at a time 💡',
        profilePic: 'data:image/jpeg;base64,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',
        posts: 12,
        followers: 860,
        following: 243,
    });

    const renderPost = ({ item }) => (
        <Image
            source={{ uri: item.image }}
            className="w-[32%] h-28 m-[0.66%] rounded-md"
            resizeMode="cover"
        />
    );

    return (
        <SafeAreaView className={`flex-2 bg-pink-50`}>

            <View className="flex-1 flex-row px-4 relative bg-black">
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

                <View className="flex-row items-center justify-between mb-4">
                    <Image
                        source={{ uri: userData.profilePic }}
                        className="w-20 h-20 rounded-full border border-pink-500"
                    />
                    <View className="flex-row justify-between flex-1 ml-4">
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

                {/* Username & Bio */}
                <Text className="text-base font-semibold text-gray-800">{userData.username}</Text>
                <Text className="text-sm text-gray-600 mb-3">{userData.bio}</Text>

                {/* Edit Profile Button */}
                <TouchableOpacity className="border border-pink-500 rounded-full py-2 items-center mb-5">
                    <Text className="text-pink-500 font-semibold">Edit Profile</Text>
                </TouchableOpacity>

                {/* Posts Grid */}
                <FlatList
                    data={mockPosts}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    renderItem={renderPost}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfilePage;
