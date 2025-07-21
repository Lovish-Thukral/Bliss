    "use client";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Check } from "lucide-react-native";
import { useRouter } from "expo-router";

function editinputsection({editval}) {

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4">
        <TouchableOpacity onPress={'() => router.back()'}>
          <Text className="text-white text-lg">✕</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Username</Text>
        <TouchableOpacity onPress={
            ''
        }>
          <Check color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Input */}
      <View className="mt-8">
        <Text className="text-white text-base mb-2">Username</Text>
        <TextInput
          value={''}
          onChangeText={''}
          placeholder="Enter username"
          placeholderTextColor="#888"
          className="border border-gray-700 rounded-xl px-4 py-3 text-white"
        />
      </View>

      {/* Info Text */}
      <View className="mt-6 space-y-3">
        <Text className="text-gray-400 text-sm">
          In most cases, you'll be able to change your username back to{" "}
          <Text className="text-white font-medium">{'initialUsername'}</Text> for another 14 days.
        </Text>
        <Text className="text-gray-400 text-sm">
          You can edit your username up to 5 times in 30 minutes.
        </Text>
        <Text className="text-gray-400 text-sm">
          Your username is visible to everyone on and off the app.
        </Text>
      </View>
    </SafeAreaView>
  );
};


export default editinputsection