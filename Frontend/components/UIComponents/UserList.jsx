import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export function UserList({ users, curruntclick = 'username' }) {
  const router = useRouter();

  const handlePress = (user) => {
    if(curruntclick === 'username') {
       router.push(`/DynamicRoutes/viewProfile/${user.username}`)
    } else {
        router.push(`/DynamicRoutes/chattingPage/${user._id}`)
    }
  }

  return (
    <ScrollView className="px-4 mt-4">
      {users.length === 0 ? (
        <Text className="text-center text-gray-500 mt-20">No user found...</Text>
      ) : (
        users.map((user) => (
          <TouchableOpacity
            key={user._id}
            className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-md"
            onPress={() => handlePress(user)}
          >
            <Image
              source={{ uri: user.profilepic }}
              className="w-12 h-12 rounded-full bg-gray-300"
            />
            <View className="ml-4">
              <Text className="text-base font-semibold text-gray-800">{user.name}</Text>
              <Text className="text-sm text-gray-500">@{user.username}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

export default UserList;
