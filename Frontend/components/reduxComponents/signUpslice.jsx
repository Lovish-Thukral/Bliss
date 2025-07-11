import { createSlice } from "@reduxjs/toolkit";


const signupSlice = createSlice({
    name: "signupdetailsreducer",
    initialState: {
        Phone : null,
        Email : null,
        password : null,
        name : null,
        username : null 
    },
    reducers: {
        addPhone : (state, action) => {
            state.Phone = action.payload
        },
        addEmail : (state, action) =>{
            state.Email =  action.payload
        },
        addpass : (state, action) =>{
            state.password =  action.payload
        },
        addname : (state, action) =>{
            state.name =  action.payload
        },
        addusername : (state, action) => {
            state.username = action.payload
        } 
}

});

export  const {addPhone, addEmail, addpass, addname, addusername} = signupSlice.actions;
export default signupSlice.reducer;