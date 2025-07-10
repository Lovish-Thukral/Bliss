import { Image, View } from 'react-native'

function homepage() {
  return (

        <View className="bg-pink-50 flex-1 items-center pt-10 relative ">
        <View className="flex-1 flex-row w-[90vw] h-[50px] justify-evenly" >
            <Image
            className = "h-[80px] w-[120px] "
            source={require('../assets/images/applogo.webp')}/>
            
            </View>    
        
        </View>
  )
}

export default homepage