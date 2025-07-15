import { createSlice } from "@reduxjs/toolkit";


const signupSlice = createSlice({
    name: "signupdetailsreducer",
    initialState: {
        phone : null,
        email : null,
        password : null,
        name : null,
        username : null,
        confirmPassword : null,
    },
    reducers: {
        addPhone : (state, action) => {
            state.phone = action.payload
        },
        addEmail : (state, action) =>{
            state.email =  action.payload
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