import { createSlice } from "@reduxjs/toolkit";


const UserDataSlice = createSlice({
    name: "userData",
    initialState: {
        name : null,
        username : null,
        posts : [],
        profilepic : null,
        followers : null,
        following : null,
        bio : null
    },
    reducers: {
       updateData : (state, action) => {
        console.log('updating')
        console.log(action)
        state.bio = action.payload.bio
        state.name = action.payload.name
        state.username = action.payload.username
        state.followers = action.payload.followers
        state.following = action.payload.following
        state.posts = action.payload.posts
        state.profilepic = action.payload.profilepic
       }
}
});

export  const {updateData} = UserDataSlice.actions;
export default UserDataSlice.reducer;