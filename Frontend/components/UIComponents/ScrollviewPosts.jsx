import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import PostDialog from './postbox';
import BackButton from './BackButton';

const { height: screenHeight } = Dimensions.get('window');

function ScrollviewPosts({ posts, isHome, onClose, initialIndex = 0 }) {
  const flatListRef = React.useRef(null);

  // Scroll to selected post when opened
  React.useEffect(() => {
    if (flatListRef.current && initialIndex > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
      }, 0);
    }
  }, [initialIndex]);

  return (
    <View className="flex-1 bg-black">
      {!isHome && (
        <View className="absolute top-6 left-4 z-50">
          <BackButton onPress={onClose} />
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ height: screenHeight }}>
            <PostDialog post={item} />
          </View>
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        decelerationRate="fast"
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />
    </View>
  );
}

export default ScrollviewPosts;
