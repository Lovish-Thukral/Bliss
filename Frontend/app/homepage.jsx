"use client";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, ScrollView, RefreshControl, ActivityIndicator, Image, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../components/UIComponents/BottomNav';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Homepage = () => {
  const router = useRouter();
  const user = useSelector((state) => state.userData);

  const [posts, setPosts] = useState([]);
  const [fetchedIds, setFetchedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () => backHandler.remove();
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
    setRefreshing(true);
    setPosts([]);
    setFetchedIds(new Set());
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const PostCard = ({ item }) => (
    <View key={item._id} className="mb-4 bg-white rounded-2xl p-3 shadow shadow-black/10">
      <Image source={{ uri: item.image }} className="w-full h-56 rounded-xl" resizeMode="cover" />
      <Text className="mt-3 text-lg font-semibold text-black">{item.username}</Text>
      <Text className="mt-1 text-sm text-gray-600">{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-pink-50">
      <Text className="text-start text-xl font-bold mt-2 px-4">@{user?.username}</Text>

      <ScrollView
        className="px-3 pb-28"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScrollEndDrag={() => fetchPosts()}
      >
        {posts.map((item) => (
          <PostCard key={item._id} item={item} />
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
