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
        state  = {
            ...action.payload
        }
       }
}

});

export  const {updateData} = UserDataSlice.actions;
export default UserDataSlice.reducer;