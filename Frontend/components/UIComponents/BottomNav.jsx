import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Home, Search, MessageCircle, User } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

const TABS = [
  { name: 'homepage', label: 'Home', icon: Home },
  { name: 'searchPage', label: 'Search', icon: Search },
  { name: 'ChatListPage', label: 'Chat', icon: MessageCircle },
  { name: 'UserProfilePage', label: 'Profile', icon: User },
];

function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnClick = (tab) => {
    if (pathname !== `/${tab}`) {
      router.push(tab);
    }
  };

  return (
    <View className="absolute bottom-0 w-full flex-row justify-around items-center py-3 bg-white shadow-lg border-t border-pink-100">
      {TABS.map(({ name, label, icon: Icon }) => {
        const isActive = pathname === `/${name}`; 
        return (
          <TouchableOpacity key={name} onPress={() => handleOnClick(name)} className="items-center">
            <Icon color={isActive ? 'pink' : 'gray'} />
            <Text className={`text-xs ${isActive ? 'text-pink-500' : 'text-gray-500'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNav;
