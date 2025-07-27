import React from 'react';
import { View, FlatList } from 'react-native';
import PostDialog from './postbox';
import BackButton from './BackButton';

function ScrollviewPosts({ posts, isHome, onClose }) {
  return (
    <View className="flex-1 bg-white">
      {!isHome && (
        <View className="absolute top-4 left-4 z-50">
          <BackButton onPress={onClose} />
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostDialog post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingTop: isHome ? 0 : 60,
          paddingBottom: 20
        }}
      />
    </View>
  );
}

export default ScrollviewPosts;