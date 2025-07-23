import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

function FollowEditbtn({ onpress, textval, Bol, disabled }) {
  return (
    <TouchableOpacity
      onPress={onpress}
      className={`${Bol ? 'bg-pink-500' : 'border border-pink-500'} rounded-full w-full mx-1.5 px-4 items-center py-2`}
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator color={Bol ? "white" : "#EC4899"} /> 
      ) : (
        <Text className={`${Bol ? 'text-white' : 'text-pink-500'} font-semibold`}>
          {textval}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default FollowEditbtn;