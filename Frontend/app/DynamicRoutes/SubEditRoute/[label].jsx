import BackButton from "../../../components/UIComponents/BackButton";
import { Check } from "lucide-react-native";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";

const EditSection = () => {
    const router = useRouter();
    const { label } = useLocalSearchParams();
    const user = useSelector((state) => state.userData);

    const [input, setInput] = useState(user[label]);
    const [isdisable, setisdisable] = useState(true);
    const [warn, setwarn] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);

    const OnCheck = async () => {
        try {
            const res = await axiosInstance.put(`/user/edit/${label}`, {
                value: input
            })
            if (res.data.success === true) {
                router.replace('/UserProfilePage')
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const inn = input.trim();
        const originalValue = user[label]?.trim() || '';


        if (inn === originalValue) {
            setisdisable(true);
            setwarn(false);
            setUsernameAvailable(false);
            return;
        }

        if (label === 'username') {
            const isValid = inn.length >= 5 && !/\s/.test(inn);
            if (isValid) {
                const checkUsername = async () => {
                    try {
                        const res = await axios.post('https://bliss-3ucs.onrender.com/api/user/checkusername', {
                            username: inn
                        });

                        if (res.data.status === false) {
                            setisdisable(false);
                            setUsernameAvailable(true);
                            setwarn(false);
                        } else {
                            setisdisable(true);
                            setUsernameAvailable(false);
                            setwarn(true);
                        }

                    } catch (err) {
                        console.error("Error checking username:", err);
                    }
                };
                checkUsername();
            } else {
                setisdisable(true);
                setUsernameAvailable(false);
                setwarn(false);
            }
        } else if (label === 'name') {
            setisdisable(inn.length < 3);
        } else if (label === 'bio') {
            setisdisable(inn.length < 10);
        }
    }, [input]);

    return (
        <SafeAreaView className="flex-1 bg-white justify-start">
                <View className="w-5/8 items-center absolute self-center top-16">
                    <Text className="text-lg font-semibold capitalize text-gray-800">
                        Edit {label}
                    </Text>
                </View>

            <View className="w-full flex-row justify-between pr-7 pt-4">
                <View>
                    <BackButton />
                </View>
                <View>
                    <TouchableOpacity onPress={OnCheck} disabled={isdisable} className="p-1">
                        <Check size={24} color={isdisable ? "#d1d5db" : "#ec4899"} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-4">
                <Text className="text-sm text-pink-600 font-medium mb-1 capitalize">
                    {label}
                </Text>
                <View className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                    <TextInput
                        className="text-base text-gray-800"
                        placeholder={`Enter your new ${label}`}
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor="#9ca3af"
                        multiline={label === 'bio'}
                        numberOfLines={label === 'bio' ? 4 : 1}
                    />
                </View>
                {input.trim() !== user[label]?.trim() && (
                    <>
                        {label === 'username' && (
                            <View className="mt-2">
                                {warn ? (
                                    <Text className="text-red-500 text-sm">Username already taken. Please try another one.</Text>
                                ) : usernameAvailable ? (
                                    <Text className="text-green-500 text-sm">Username available!</Text>
                                ) : (
                                    <Text className="text-gray-500 text-sm">Enter a unique username (min 5 chars, no spaces)</Text>
                                )}
                            </View>
                        )}

                        {label === 'name' && (
                            <Text className="text-gray-500 text-sm mt-2">Enter your full name (min 3 characters)</Text>
                        )}

                        {label === 'bio' && (
                            <Text className="text-gray-500 text-sm mt-2">Tell others about yourself (min 10 characters)</Text>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default EditSection;