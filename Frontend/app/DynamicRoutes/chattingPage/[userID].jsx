import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import { io } from 'socket.io-client';
import {
  Phone,
  Camera,
  Mic,
  SendHorizontal,
  ArrowLeft,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

const DEFAULT_OTHER_PFP =
  'https://cdn-icons-png.flaticon.com/512/3177/3177440.png';

export default function ChatScreen() {
  const { userID } = useLocalSearchParams();
  const router = useRouter();
  const myUser = useSelector((state) => state.userData);
  const userProfile = myUser.profilepic;
  const myUserId = myUser._id;

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const socket = useMemo(() => io('https://bliss-7r87.onrender.com'), []);

  const handleSave = async (newMessages) => {
    try {
      await AsyncStorage.setItem(`chat_${userID}`, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem(`chat_${userID}`);
      if (saved) setMessages(JSON.parse(saved));
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const handleSend = () => {
    if (inputVal.trim() !== '') {
      const myMessage = { text: inputVal, sender: 'me' };

      socket.emit('private_message', {
        from: myUserId,
        to: userID,
        text: inputVal,
      });

      const updated = [...messages, myMessage];
      setMessages(updated);
      setInputVal('');
      handleSave(updated);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace('/ChatListPage');
      return true;
    });
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!myUserId) return;

    socket.on('connect', () => {
      socket.emit('register', myUserId);
      console.log('Connected with socket ID:', socket.id);
    });

    socket.on('private_message', ({ from, text }) => {
      if (from === userID) {
        const otherMsg = { text, sender: 'other' };
        const updated = [...messages, otherMsg];
        setMessages(updated);
        handleSave(updated);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, myUserId]);

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <KeyboardAvoidingView className="flex-1 bg-pink-50" behavior="padding" keyboardVerticalOffset={0}>
      <View className="pt-10 bg-pink-500" />
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-pink-200">
        <TouchableOpacity onPress={() => router.replace('/ChatListPage')}>
          <ArrowLeft color="black" size={24} />
        </TouchableOpacity>
        <View className="flex-row gap-7">
          <Phone color="pink" size={28} />
          <Camera color="pink" size={28} />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 py-2"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            className={`flex-row items-end mb-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'other' && (
              <Image
                source={{ uri: DEFAULT_OTHER_PFP }}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <View
              className={`rounded-2xl px-4 py-2 max-w-[70%] shadow ${
                msg.sender === 'me' ? 'bg-pink-500 rounded-tr-none' : 'bg-white rounded-tl-none'
              }`}
            >
              <Text className={`text-sm ${msg.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>
                {msg.text}
              </Text>
            </View>
            {msg.sender === 'me' && (
              <Image
                source={{ uri: userProfile }}
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center px-4 py-3 bg-white border-t border-pink-200">
        <TextInput
          className="flex-1 bg-pink-100 text-black px-4 py-2 rounded-full mr-2"
          placeholder="Type a message"
          placeholderTextColor="#a1a1aa"
          value={inputVal}
          onChangeText={setInputVal}
        />
        <TouchableOpacity onPress={handleSend}>
          <SendHorizontal color="#ec4899" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-3">
          <Mic color="#ec4899" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}