import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import PostDialog from './postbox';
import { LayoutGrid, PictureInPicture2 } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const imageSize = screenWidth / 3;

function ViewPostsSection({ posts }) {
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [column, setcolumn] = useState(false)

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
    setcolumn(true)
  };

 return (
  <View className="flex-1">
    {/* Header buttons */}
    <View className="flex-row justify-between w-full p-5 border border-gray-200">
      <TouchableOpacity className="flex-1 items-center" onPress={() => setcolumn(false)}>
        <LayoutGrid />
      </TouchableOpacity>
      <TouchableOpacity className="flex-1 items-center" onPress={() => setcolumn(true)}>
        <PictureInPicture2 />
      </TouchableOpacity>
    </View>

    {/* Scrollable content */}
      {loading ? (
        <ActivityIndicator className="my-5 text-gray-400" />
      ) : pics.length === 0 ? (
        <Text className="my-5 text-center text-gray-400">No posts yet...</Text>
      ) : !column ? (
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
      ) : (
        <ScrollView className="px-3 pb-28 mt-3 flex-grow"
        >
          {pics.map((post, index) => (
            <View className="mb-4" key={index}>
              <PostDialog post={post} />
            </View>
          ))}
        </ScrollView>
      )}
    
  </View>
);

}

export default ViewPostsSection;
