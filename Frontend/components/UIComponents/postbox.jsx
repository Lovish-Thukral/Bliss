import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Share } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';

export default function PostDialog({ post }) {
  const comntRef = useRef();
  const uid = useSelector((state) => state.userData._id);

  const [liked, setLiked] = useState(post.likesCount?.includes(uid));
  const [comment, setComment] = useState('');

  const toggleLike = async () => {
    const bol = liked;
    setLiked(!liked);

    try {
      const res = await axiosInstance.put(
        `/post/inpost/${bol ? 'unlike' : 'like'}?ID=${post._id}`,
        { comment: '' }
      );
      console.log(res.data);
    } catch (error) {
      console.log('Like/unlike error:', error.response?.data || error.message);
    }
  };

  const submitComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axiosInstance.put(
        `/post/inpost/comment?ID=${post._id}`,
        { comment }
      );
      console.log(res.data);
      setComment('');
    } catch (error) {
      console.log('Comment error:', error.response?.data || error.message);
    }
  };

   const handleShare = async () => {
    try {
      const isShared = await Share.share({
        message: `Check out @${post.user}'s post on Bliss! 🌸\n${'hhttps://bliss-7r87.onrender.com/api/user/userprofile'}/${userData.username}`
      });
      if (isShared.action === Share.sharedAction) {
        showSnackbar("Profile shared!");
      }
    } catch (error) {
      showSnackbar("Failed to share profile.");
    }
  };

  return (
    <View className="bg-pink-50 px-4 py-3 rounded-lg">
      {/* Header: User Info */}
      <View className="flex-row items-center justify-between mb-3">
        <View>
          <Text className="font-semibold text-black">{post.user}</Text>
          <Text className="text-xs text-gray-500">{post.location}</Text>
        </View>
        <Text className="text-xs text-gray-400">{post.timeAgo}</Text>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: post.image }}
        className="w-full h-96 rounded-xl mb-3"
        resizeMode="cover"
      />

      {/* Action Buttons */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={toggleLike}>
            <Heart
              size={28}
              stroke={liked ? 'red' : 'black'}
              fill={liked ? 'red' : 'none'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => comntRef.current.focus()}>
            <MessageCircle size={28} stroke="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Send size={28} stroke="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Bookmark size={28} stroke="black" />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <Text className="text-sm text-black mb-2">
        <Text className="font-semibold"> Likes : {post.likesCount.length} </Text>
        {post.Comment.map((c) => c.text)}
      </Text>

      {/* Comment Input */}
      <View className="flex-row items-center border-t border-gray-200 pt-2">
        <TextInput
          ref={comntRef}
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          className="flex-1 text-sm text-black px-2"
        />
        <TouchableOpacity onPress={submitComment}>
          <Text className="text-blue-500 text-sm font-medium px-2">Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
