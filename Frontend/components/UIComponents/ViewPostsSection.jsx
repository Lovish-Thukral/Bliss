import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import ScrollviewPosts from './ScrollviewPosts'

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3;

function ViewPostsSection({ posts }) {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [largePostVisible, setLargePostVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          posts.map((post) =>
            axios.post('https://bliss-7r87.onrender.com/api/post/viewposts', { postID: post })
          )
        );
        const postsData = responses.map((res) => res.data.post);
        setPics(postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (posts && posts.length > 0) {
      fetchPosts();
    } else {
      setPics([]);
    }
  }, [posts]);

  const handleImagePress = (index) => {
    setSelectedPostIndex(index);
    setLargePostVisible(true);
  };

  return (
    <View className="flex-1 mb-20">
      {loading ? (
        <ActivityIndicator className="my-5 text-gray-400" />
      ) : pics.length === 0 ? (
        <Text className="my-5 text-center text-gray-400">No posts yet...</Text>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {pics.map((post, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderWidth: 0.5,
                  borderColor: '#fff',
                }}
                onPress={() => handleImagePress(index)}
              >
                <Image
                  source={{ uri: post.image }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {largePostVisible && (
            <View className="absolute inset-0 bg-black z-50">
              <ScrollviewPosts
                posts={pics}
                initialIndex={selectedPostIndex}
                isHome={false}
                onClose={() => setLargePostVisible(false)}
              />
            </View>
          )} 
         
        </>
      )}
    </View>
  );
}

export default ViewPostsSection;
