import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Send } from 'lucide-react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';

export default function HelpSupport() {
  const user = useSelector((state) => state.userData);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !mobile.trim() || !message.trim()) {
      Alert.alert('Incomplete', 'Please fill out all fields.');
      return;
    }

    const formData = {
      username: user?.username || 'Anonymous',
      user_email: email,
      user_mobile: mobile,
      message,
    };

    try {
      await send(
        'service_yz1z03u',        
        'template_m4bm58p',      
        formData,
        {
          publicKey: 'hhI6FwjO75yPEW5md', 
        }
      );

      Alert.alert('Success', 'Your message has been sent!');
      setEmail('');
      setMobile('');
      setMessage('');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EmailJS Request Failed...', err);
      }
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.log('ERROR', err);
    }
  };

  return (
    <View className="flex-1 bg-pink-50 px-5">
      <View className="pt-10 bg-pink-500 mb-10" />
      <View className="items-center mb-6">
        <Image
          source={{ uri: user?.profilepic || 'https://example.com/default.jpg' }}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-lg font-semibold text-pink-500">Help & Support</Text>
        <Text className="text-sm text-gray-500 text-center">We’re here to help you</Text>
      </View>

      <TextInput
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="bg-white mb-3 p-4 rounded-2xl text-base text-gray-800 shadow"
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        className="bg-white mb-3 p-4 rounded-2xl text-base text-gray-800 shadow"
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        multiline
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        className="bg-white mb-4 p-4 rounded-2xl text-base text-gray-800 min-h-[120px] shadow"
        placeholderTextColor="#9ca3af"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="flex-row items-center justify-center bg-pink-500 px-4 py-3 rounded-2xl"
      >
        <Send color="white" size={20} />
        <Text className="text-white ml-2 font-semibold text-base">Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
