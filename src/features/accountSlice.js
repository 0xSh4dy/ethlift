import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name:"account",
    initialState:{
        account:""
    },
    reducers:{
        setAccount:(state,action)=>{
            state.account = action.payload
        }
    }
});

export default accountSlice.reducer;
export const {setAccount} = accountSlice.actions;
export const selectAccount =  (state)=>state.account.account;