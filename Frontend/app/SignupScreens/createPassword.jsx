"use client";
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../components/UIComponents/BackButton';

const fetchApi = async (data) => {
    try {
        const res = await axios.post('https://bliss-olxz.onrender.com/api/user/signup', data);
        return { data: res.data, status: res.status };
    } catch (err) {
        return { data: { message: "Something went wrong" }, status: 500 };
    }
};

const CreatePassword = () => {
    const router = useRouter();
    const RegisterationData = useSelector((state) => state.signupdetails);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toggle, maketoggle] = useState(false);
    const [showsnack, makeshowsnack] = useState(false)

    const isValid = password.length >= 8 && password === confirmPassword;

    useEffect(() => {
        if (toggle) {
            const registerUser = async () => {
                setLoading(true);
                const dataToSend = { ...RegisterationData, password, confirmPassword };
                console.log(dataToSend)
                const response = await fetchApi(dataToSend);
                console.log(response.data)
                setLoading(false);

                if (response.data.message === "User created successfully") {
                    console.log('created')
                    makeshowsnack(true)
                    router.push('login');
                    setTimeout(() => {
                        makeshowsnack(false)
                    }, 2000);
                } else if (response.data.message === "User already existed") {
                    router.replace("/SignupScreens/EnterUsername");
                } else if (response.data.message === "All fields are required") {
                    router.replace("/signup");
                }
            };
            registerUser();
        }
    }, [toggle]);

    return (
        <SafeAreaView className="flex-1 bg-pink-50 items-center pt-10">
            <BackButton />
            <View>
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
                    Use at least 8 characters. Mix letters, numbers & symbols.
                </Text>

                <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => maketoggle(true)}
                    className={`mt-6 py-3 rounded-full items-center ${isValid ? 'bg-pink-500' : 'bg-pink-300'}`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-semibold text-base w-[100%] text-center">Continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreatePassword;
