"use client";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/UIComponents/BottomNav';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostDialog from '../components/UIComponents/postbox';

const formatDate = (date) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day} ${month}, ${hours}:${minutes} ${ampm}`;
};

const Homepage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.userData);

  const [posts, setPosts] = useState([]);
  const [fetchedIds, setFetchedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(`https://bliss-7r87.onrender.com/api/post/homepage-posts?size=10}`, {
        exclude: Array.from(fetchedIds),
      });
      const newPosts = res.data.posts || [];
      const uniquePosts = newPosts.filter(post => !fetchedIds.has(post._id));
      setPosts(prev => [...prev, ...uniquePosts]);
      setFetchedIds(prev => {
        const updated = new Set(prev);
        uniquePosts.forEach(post => updated.add(post._id));
        return updated;
      });
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setTimeout(() => {
      setRefreshing(true);
      setPosts([]);
      setFetchedIds(new Set());
    }, 5000);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <View className="flex-row justify-between items-center px-4 mt-2">
        <View className="flex-row items-center space-x-3">
          <Image
            source={{ uri: user?.profilepic }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="text-lg font-bold text-black">@{user?.username}</Text>
            <Text className="text-xs text-gray-600">{user.name}</Text>
          </View>
        </View>
          <Text className="text-sm text-gray-700 px-2 font-bold">
          {formatDate(dateTime)}
        </Text>
      </View>

      

      <ScrollView
        className="px-3 pb-28 mt-3"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScrollEndDrag={() => fetchedIds.length > 3 ? fetchPosts() : null}
      >
        {posts.map((item, index) => (
          <View key={index}>
          <PostDialog post={item} />
          </View>
        ))}

        {loading && (
          <View className="py-6">
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </ScrollView>

      <BottomNav router={router} />
    </SafeAreaView>
  );
};

export default Homepage;
