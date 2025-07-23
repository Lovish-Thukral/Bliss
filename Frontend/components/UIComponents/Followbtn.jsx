import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import { addFollow, removeFollow } from '../reduxComponents/UserDataSlice';
import FollowEditbtn from './stylingComponents/FollowEditbtn';

export const Followbtn = ({ userID }) => {
    const dispatch = useDispatch();
    const userFollowing = useSelector((state) => state.userData.following) || [];
    const userFollower = useSelector((state) => state.userData.followers) || [];
    const [isProcessing, setIsProcessing] = useState(false);

    const isFollowing = userFollowing.includes(userID);
    const followsYou = userFollower.includes(userID);

    const followUser = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            await axiosInstance.put('./user/edit/follow', { UserID: userID });

            if (isFollowing) {
                dispatch(removeFollow(userID));
            } else {
                dispatch(addFollow(userID));
            }

        } catch (error) {
            console.error('Follow operation failed:', error);
            alert('Operation failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    let buttonText = isFollowing ? "Following" : followsYou ? "Follow Back" : "Follow";
    if (isProcessing) buttonText = "Processing...";

    return (
        <FollowEditbtn
            textval={buttonText}
            Bol={!isFollowing}
            onpress={followUser}
            disabled={isProcessing}
        />
    );
};
