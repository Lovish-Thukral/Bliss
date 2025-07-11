import { configureStore } from "@reduxjs/toolkit";
import signupdetailsreducer from "../components/reduxComponents/signUpslice"

const storage = configureStore({ reducer: { signupdetails : signupdetailsreducer} });

export default storage;