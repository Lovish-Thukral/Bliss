import { useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Home, Search, Film, MessageCircle, User } from 'lucide-react-native'

function BottomNav({router}) {

    const [activeTab, setActiveTab] = useState('home');
    const Handleonclick = (tab) => {
        setActiveTab(tab)
        router.push(tab)
    }

    return (
        <View className="absolute bottom-0 w-full flex-row justify-around items-center py-3 bg-white shadow-lg border-t border-pink-100">
            <TouchableOpacity onPress={() => Handleonclick('homepage')} className="items-center">
                <Home color={activeTab === 'homepage' ? 'pink' : 'gray'} />
                <Text className={`text-xs ${activeTab === 'homepage' ? 'text-pink-500' : 'text-gray-500'}`}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Handleonclick('searchPage')} className="items-center">
                <Search color={activeTab === 'searchPage' ? 'pink' : 'gray'} />
                <Text className={`text-xs ${activeTab === 'searchPage' ? 'text-pink-500' : 'text-gray-500'}`}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Handleonclick('reelspage')} className="items-center">
                <Film color={activeTab === 'reelspage' ? 'pink' : 'gray'} />
                <Text className={`text-xs ${activeTab === 'reelspage' ? 'text-pink-500' : 'text-gray-500'}`}>Reels</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Handleonclick('chatSection')} className="items-center">
                <MessageCircle color={activeTab === 'chatSection' ? 'pink' : 'gray'} />
                <Text className={`text-xs ${activeTab === 'chatSection' ? 'text-pink-500' : 'text-gray-500'}`}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Handleonclick('UserProfilePage')} className="items-center">
                <User color={activeTab === 'UserProfilePage' ? 'pink' : 'gray'} />
                <Text className={`text-xs ${activeTab === 'UserProfilePage' ? 'text-pink-500' : 'text-gray-500'}`}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BottomNav