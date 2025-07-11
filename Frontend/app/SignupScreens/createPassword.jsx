import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import BackButton from '../../components/UIComponents/BackButton';

const CreatePasswordScreen = () => {
    const router = useRouter()

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isValid = password.length >= 8 && password === confirmPassword;

    return (
        <SafeAreaView className="flex-1 bg-pink-50 items-center pt-10">
            <BackButton />

            <View >
                <Text className="text-2xl font-bold text-gray-800">Create a Strong Password</Text>
                <Text className="text-sm text-gray-500 mt-2">Make it tough — so only you can unlock your world.</Text>

                <View className="mt-6 relative">
                    <TextInput
                        className="border border-gray-300 rounded-full px-4 py-3 text-base text-gray-800 bg-white pr-12"
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                </View>

                <View className="mt-4 relative">
                    <TextInput
                        className="border border-gray-300 rounded-full px-4 py-3 text-base text-gray-800 bg-white pr-12"
                        placeholder="Re-enter password"
                        secureTextEntry={!showConfirm}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-3.5"
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </TouchableOpacity>
                </View>

                <Text className="text-xs text-gray-400 mt-2 ml-2">
                    Use at least 6 characters. Mix letters, numbers & symbols.
                </Text>
                
                <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => router.push('/homepage')}
                    className={`mt-6 py-3 rounded-full items-center ${isValid ? 'bg-pink-500' : 'bg-pink-300'
                        }`}
                >
                    <Text className="text-white font-semibold text-base">Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreatePasswordScreen;
