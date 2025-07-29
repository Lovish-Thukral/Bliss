import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, BackHandler } from 'react-native'
import { io } from 'socket.io-client'
import { Phone, Camera, Mic, SendHorizontal, ArrowLeft } from 'lucide-react-native'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'

const DEFAULT_OTHER_PFP = 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
const SOCKET_URL = 'https://bliss-7r87.onrender.com'
const EVENT = 'privatemsg'

export default function ChatScreen() {
  const { userID } = useLocalSearchParams()
  const router = useRouter()
  const myUser = useSelector(state => state.userData)
  const myUserId = myUser._id
  const userProfile = myUser.profilepic

  const [inputVal, setInputVal] = useState('')
  const [messages, setMessages] = useState([])
  const scrollRef = useRef(null)
  const socket = useRef(null)

  const save = async msgs => {
    try {
      await AsyncStorage.setItem(`chat_${userID}`, JSON.stringify(msgs))
    } catch {}
  }

  const load = async () => {
    try {
      const saved = await AsyncStorage.getItem(`chat_${userID}`)
      if (saved) setMessages(JSON.parse(saved))
    } catch {}
  }

  const send = () => {
    try {
      if (!inputVal.trim()) return
      socket.current.emit(EVENT, { from: myUserId, to: userID, text: inputVal })
      const msg = { text: inputVal, sender: 'me' }
      setMessages(prev => {
        const u = [...prev, msg]
        save(u)
        return u
      })
      setInputVal('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
 
  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  useEffect(() => {
    const b = BackHandler.addEventListener('hardwareBackPress', () => {
      router.replace('/ChatListPage')
      return true
    })
    return () => b.remove()
  }, [])

  useEffect(() => {
    if (!myUserId) return
    socket.current = io(SOCKET_URL)
    socket.current.on('connect', () => {
      socket.current.emit('register', myUserId)
    })
    socket.current.on(EVENT, ({ from, text }) => {
      if (from === userID) {
        const msg = { text, sender: 'other' }
        setMessages(prev => {
          const u = [...prev, msg]
          save(u)
          return u
        })
      }
    })
    return () => {
      socket.current.off(EVENT)
      socket.current.disconnect()
    }
  }, [myUserId, userID])

  return (
    <KeyboardAvoidingView className="flex-1 bg-pink-50" behavior="padding">
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
      <ScrollView ref={scrollRef} className="flex-1 px-4 py-2" contentContainerStyle={{ paddingBottom: 16 }}>
        {messages.map((msg, i) => (
          <View key={i} className={`flex-row items-end mb-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'other' && <Image source={{ uri: DEFAULT_OTHER_PFP }} className="w-8 h-8 rounded-full mr-2" />}
            <View className={`rounded-2xl px-4 py-2 max-w-[70%] shadow ${msg.sender === 'me' ? 'bg-pink-500 rounded-tr-none' : 'bg-white rounded-tl-none'}`}>
              <Text className={`text-sm ${msg.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>{msg.text}</Text>
            </View>
            {msg.sender === 'me' && <Image source={{ uri: userProfile }} className="w-8 h-8 rounded-full ml-2" />}
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
        <TouchableOpacity onPress={send}>
          <SendHorizontal color="#ec4899" size={24} />
        </TouchableOpacity>
        <TouchableOpacity className="ml-3">
          <Mic color="#ec4899" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
