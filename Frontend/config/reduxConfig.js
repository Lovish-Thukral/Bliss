import { configureStore } from "@reduxjs/toolkit";
import signupdetailsreducer from "../components/reduxComponents/signUpslice"
import UserData from "../components/reduxComponents/UserDataSlice"

const storage = configureStore({ reducer: { signupdetails : signupdetailsreducer,
    userData : UserData
} });

export default storage;