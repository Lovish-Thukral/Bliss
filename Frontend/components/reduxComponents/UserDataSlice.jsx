import { createSlice } from "@reduxjs/toolkit";


const UserDataSlice = createSlice({
    name: "userData",
    initialState: {
        name: null,
        username: null,
        posts: [],
        profilepic: null,
        followers: null,
        following: null,
        bio: null,
        _id : null
    },
    reducers: {
        updateData: (state, action) => {
            state._id = action.payload._id
            state.bio = action.payload.bio
            state.name = action.payload.name
            state.username = action.payload.username
            state.followers = action.payload.followers
            state.following = action.payload.following
            state.posts = action.payload.posts
            state.profilepic = action.payload.profilepic
        },

        addFollow: (state, action) => {
            state.following = [[...state.following], action.payload]
        },

        removeFollow: (state, action) => {
            console.log('removed')
            state.following = state.following.filter(userId => userId !== action.payload);
        }
    }
});

export const { updateData, addFollow, removeFollow } = UserDataSlice.actions;
export default UserDataSlice.reducer;