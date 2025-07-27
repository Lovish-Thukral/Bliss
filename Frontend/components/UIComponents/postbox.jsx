import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';

export default function PostDialog({ post }) {
  return (
    <ScrollView className="bg-white rounded-2xl p-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-2">
          <View>
            <Text className="font-semibold text-black">{post.username}</Text>
            <Text className="text-xs text-gray-500">{post.location}</Text>
          </View>
        </View>
        <Text className="text-xs text-gray-400">{post.timeAgo}</Text>
      </View>
      <Image
        source={{ uri: post.image }}
        className="w-full h-96 rounded-xl mb-3"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row space-x-4">
          <Heart size={22} stroke="black" />
          <MessageCircle size={22} stroke="black" />
          <Send size={22} stroke="black" />
        </View>
        <Bookmark size={22} stroke="black" />
      </View>
      <Text className="text-sm text-black">
        <Text className="font-semibold">{post.username}</Text> {post.caption}
      </Text>
      {post.comments?.length > 0 && (
        <Text className="text-gray-500 text-sm mt-1">View all {post.comments.length} comments</Text>
      )}
      <View className="flex-row items-center mt-3 border-t border-gray-200 pt-2">
        {/* <Image
          source={{ uri: post.currentUserAvatar }}
          className="w-8 h-8 rounded-full mr-2"
        /> */}
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          className="flex-1 text-sm text-black"
        />
      </View>
    </ScrollView>
  );
}
