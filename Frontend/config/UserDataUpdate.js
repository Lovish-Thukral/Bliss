import axiosInstance from '../utils/axiosInstance.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const verifyToken = async () => {
    try {
        const res = await axiosInstance.post('/user/TokenVerify');
        const user = res.data?.user?._doc;
        if (!user) {
            return false
        }
        return user
    } catch (error) {
        if(error) {
            
            console.log(error)
            return false
        }
    }
};


const UserDataUpdate = async () => {

    const data = await verifyToken();
    if (!data) {
        await AsyncStorage.removeItem("token")
        return false
    }

    return data
}


export default UserDataUpdate;

