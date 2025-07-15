import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEmail, addname, addpass, addPhone, addusername } from '../reduxComponents/signUpslice';
import { useState } from 'react';
import { Check } from 'lucide-react-native';

function Continuebtn({ nextpage, checkFun, patchvalue, patchtype, isdisabled = false }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onclickFun = async() => {
        const tosendvalue = patchvalue;
        setLoading(true);
        const val = await checkFun(patchvalue);
        setLoading(false);
        
        if (val) {
            switch (patchtype) {
                case 'phone':
                    dispatch(addPhone(tosendvalue));
                    break;
                case 'name':
                    dispatch(addname(tosendvalue));
                    break;
                case 'email':
                    dispatch(addEmail(tosendvalue));
                    break;
                case 'username':
                    dispatch(addusername(tosendvalue));
                    break;
                case 'password':
                    dispatch(addpass(tosendvalue));
                    break;
                default:
                    break;
            }

            setSuccess(true);
            router.push(nextpage);
        }
    };

    return (
        <TouchableOpacity
            className=
           { `${!isdisabled ? 'bg-pink-500' : 'bg-pink-300' } flex-row items-center justify-center px-6 py-3 rounded-full mt-5 shadow-lg w-full`}
            onPress={onclickFun}
            disabled = {isdisabled}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : success ? (
                <Check className="text-white font-bold text-base" />
            ) : (
                <Text className="text-white font-semibold text-base w-[100%] text-center">Continue</Text>
            )}
        </TouchableOpacity>
    );
}

export default Continuebtn;
