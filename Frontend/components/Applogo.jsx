import { View, Image } from "react-native";

export default function Logo() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
         source={require('../assets/images/applogo.webp')}
         className="w-full h-full"
         resizeMode="contain">
         </Image>
    </View>
  );
}
