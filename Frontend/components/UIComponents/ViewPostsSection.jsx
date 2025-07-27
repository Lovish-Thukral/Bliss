import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import ScrollviewPosts from './ScrollviewPosts'

const ITEM_HEIGHT = 140; // h-40 + margin + some space for caption
const SNAP_INTERVAL = ITEM_HEIGHT * 3;

function ViewPostsSection({ posts }) {
  const [pics, setPics] = useState([])
  const [loading, setLoading] = useState(false)
  const [largePostVisible, setLargePostVisible] = useState(false)
  const [selectedPostIndex, setSelectedPostIndex] = useState(0)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          posts.map((post) =>
            axios.post('https://bliss-3ucs.onrender.com/api/post/viewposts', { postID: post })
          )
        );
        const postsData = responses.map((res) => res.data.post)
        setPics(postsData)

      } catch (err) {
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    if (posts && posts.length > 0) {
      fetchPosts()
    } else {
      setPics([])
    }
  }, [posts])

  const rows = [];
  for (let i = 0; i < pics.length; i += 3) {
    rows.push(pics.slice(i, i + 3));
  }

  const handleImagePress = (index) => {
    setSelectedPostIndex(index)
    setLargePostVisible(true)
  }

  return (
    <View className="flex-1 p-2 mb-20">
      {loading ? (
        <ActivityIndicator className="my-5 text-gray-400" />
      ) : pics.length === 0 ? (
        <Text className="my-5 text-center text-gray-400">No posts yet...</Text>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {rows.map((rowItems, rowIndex) => (
              <View key={rowIndex} className="flex-row mb-1">
                {rowItems.map((post, index) => (
                  <TouchableOpacity 
                    key={index} 
                    className="flex-1 mr-1 mb-1 bg-gray-100 rounded-lg overflow-hidden"
                    onPress={() => handleImagePress(rowIndex * 3 + index)}
                  >
                    <Image
                      source={{ uri: post.image }}
                      className="w-full h-32"
                      resizeMode="cover"
                    />
                    {post.caption && (
                      <Text className="p-1 text-xs text-gray-800 truncate">
                        {post.caption}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          {/* {largePostVisible && (
            <View className="absolute inset-0 bg-black z-50">
              <ScrollviewPosts 
                posts={pics}
                initialIndex={selectedPostIndex}
                isHome={false}
                onClose={() => setLargePostVisible(false)}
              />
            </View>
          )} */}
        </>
      )}
    </View>
  )
}

export default ViewPostsSection