"use client";
import axiosInstance from '../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import BackButton from '../components/UIComponents/BackButton';

const LoginPage = () => {
    const router = useRouter();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const isValid = identifier.trim().length > 0 && password.length >= 8;

    const handleLogin = async () => {
        if (!isValid) return;

        setLoading(true);

        try {
            let key;
            if (identifier.includes('@')) {
                key = "email"
            } else if (!isNaN(identifier)) {
                key = "mobile"
            } else {
                key = "username"
            }
        
            const res = await axiosInstance.post('/user/login', {
                [key]: identifier,
                password,
            });

            const { token, user, message } = res.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            router.replace('/homepage');
        } catch (err) {
            console.error('Login error:', err);
            alert(err?.response?.data?.message || 'Login failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-pink-50 items-center pt-10">
            <BackButton />
            <View>
                <Text className="text-2xl font-bold text-gray-800">Welcome Back!</Text>
                <Text className="text-sm text-gray-500 mt-2">Login to continue your journey.</Text>

                <View className="mt-6">
                    <TextInput
                        className="border border-gray-300 rounded-full px-4 py-3 text-base text-gray-800 bg-white w-80"
                        placeholder="Username / Email / Phone"
                        value={identifier}
                        onChangeText={setIdentifier}
                    />
                </View>

                <View className="mt-4 relative">
                    <TextInput
                        className="border border-gray-300 rounded-full px-4 py-3 text-base text-gray-800 bg-white pr-12 w-80"
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

                <Text className="text-xs text-gray-400 mt-2 ml-2">
                    Password must be at least 8 characters.
                </Text>

                <TouchableOpacity
                    disabled={!isValid || loading}
                    onPress={handleLogin}
                    className={`mt-6 py-3 rounded-full items-center w-80 ${isValid ? 'bg-pink-500' : 'bg-pink-300'}`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-semibold text-base">Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginPage;
