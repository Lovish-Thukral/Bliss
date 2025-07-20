import { Image, View, TouchableOpacity, Text, BackHandler } from "react-native";
import FollowPage from "../../app/RepeatedScreens/FollowPage";
import { useState, useEffect } from "react";
function ProfileHeader({ pic, follower, following, bio, name, username, postLength, router }) {
    const [showFollower, setShowFollower] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const popUpBack = () => {
        if (showFollower) {
            setShowFollower(false)
            return true
        }
        else if (showFollowing) {
            setShowFollowing(false)
            return true
        }
        else {
            router.back()
            return true
        }
    }

    useEffect(() => {
        if (!showFollower || !showFollowing) return;
        const backHandler = BackHandler.addEventListener("hardwareBackPress", popUpBack);

        return () => backHandler.remove();
    }, [[showFollower, showFollowing]]);

    


    return (
        <View className='relative'>
            <View className={`${showFollower ? "flex" : "hidden"} bg-pink-50 h-[100vh] w-[100vw] absolute top-0 px-4 right-0 z-30`}>
                <FollowPage
                    Backbtn={() => setShowFollower(false)}
                    followlist={follower} />
            </View>
            <View className={`${showFollowing ? "flex" : "hidden"} bg-pink-50 h-[100vh] w-[100vw] absolute top-0 px-4 right-0 z-30`}>
                <FollowPage
                    Backbtn={() => setShowFollowing(false)} 
                    followlist={following}/>
            </View>
            <View className="flex-row px-4 py-4 items-center justify-between bg-pink-50 shadow-md">
                <Text className="text-xl font-semibold text-gray-800">@{username}</Text>
            </View>
            <View className="px-5">

                <View className="flex-row items-center justify-between mb-4 ">
                    <Image
                        src={pic}
                        className="w-24 h-24 rounded-full border-4 border-pink-500 border-solid bg-black"
                    />
                    <View className="flex-row justify-between flex-1 ml-6">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-800">{postLength}</Text>
                            <Text className="text-xs text-gray-500">Posts</Text>
                        </View>
                        <TouchableOpacity className="items-center"
                            onPress={() => setShowFollower(true)}>
                            <Text className="text-lg font-bold text-gray-800">{follower.length}</Text>
                            <Text className="text-xs text-gray-500">Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center"
                            onPress={() => setShowFollowing(true)}>
                            <Text className="text-lg font-bold text-gray-800">{following.length}</Text>
                            <Text className="text-xs text-gray-500">Following</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-base font-semibold text-gray-800">{name}</Text>
                <Text className="text-sm text-gray-600 mb-5">{bio}</Text>

            </View>
        </View>
    )
}

export default ProfileHeader