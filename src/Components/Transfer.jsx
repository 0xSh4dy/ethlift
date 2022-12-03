import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/accountSlice";

export default function Transfer() {
  const [account, setAccount] = useState("");
  const acct = useSelector(selectAccount);

  function SendTransaction() {
    console.log(acct.account);
    
  }

  return (
    <div className="transferBox w-fit p-4 rounded-2xl">
      <input
        className="block mt-2 p-2 rounded-2xl"
        type="text"
        placeholder="Receiver's address"
      />
      <input
        className="block mt-2 p-2 rounded-2xl"
        type="text"
        placeholder="Enter amount (ether)"
      />
      <input
        className="block mt-2 p-2 rounded-2xl"
        type="text"
        placeholder="Enter message"
      />
      <button
        onClick={SendTransaction}
        className="bg-white w-full mt-2 p-2 rounded-2xl bg-[#0ea5e9] text-white"
      >
        Send Transaction
      </button>
    </div>
  );
}
