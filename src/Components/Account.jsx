import { useState } from "react"
import { useDispatch } from "react-redux";
import { setAccount } from "../features/accountSlice";

export default function Account(){
    const dispatch = useDispatch();
    const [account,setAccountValue] = useState("");
    function SaveAccount(){
        dispatch(setAccount({
            account:account
        }));
        setAccountValue("");
    }
    return <div className="absolute accountBox rounded-2xl">
        <p className="text-center mt-2">Account Setup</p>
        <input type="text" className="mt-4 p-2 rounded-2xl block bg-[#0093E9] text-white" placeholder="Account" onChange={(e)=>{setAccountValue(e.target.value)}} value={account}/>
        <button className="bg-white p-2 pl-4 pr-4 mt-4 rounded-2xl w-full bg-[#6A179C] text-white" onClick={SaveAccount}>Save</button>
    </div>
}