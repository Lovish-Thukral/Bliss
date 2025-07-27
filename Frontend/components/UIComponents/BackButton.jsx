import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useNavigation } from 'expo-router'
import { goBack } from 'expo-router/build/global-state/routing'

function BackButton() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} className="self-start mx-7 mb-10">
            <Text className="text-lg text-pink-500">{'< Back'}</Text>
        </TouchableOpacity>
    )
}

export default BackButton