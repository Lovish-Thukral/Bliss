import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEmail, addname, addpass, addPhone, addusername } from '../reduxComponents/signUpslice';

function Continuebtn({nextpage, checkFun, patchvalue, patchtype}) {
    const router = useRouter();
    const dispatch = useDispatch();

    const onclickFun =  () => {
        const val =  checkFun();
        switch (patchtype) {
            case "phone":
                dispatch(addPhone([patchvalue]))
                break;
            case "name":
                dispatch(addname(patchvalue))
                break;
            case "email":
                dispatch(addEmail(patchvalue))
                break;
            case "username":
                dispatch(addusername(patchvalue))
                break;
            case "password":
                dispatch(addpass(patchvalue))
                break;
            default:
                break;
        }
        console.log(checkFun())
       val ? router.push(nextpage) : null
    }
    return (
        <TouchableOpacity
            className="bg-pink-500 flex-row items-center justify-center px-6 py-3 rounded-full mt-5 shadow-lg"
            onPress={onclickFun}
        >
            <Text className="text-white font-semibold text-base w-[50vw] text-center"> Continue </Text>
        </TouchableOpacity>
    )
}

export default Continuebtn;



