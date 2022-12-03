import { useSelector } from "react-redux";
import { selectAccount } from "../features/accountSlice";
import { RPC_URL } from "../app/vals";
import { useEffect, useState } from "react";
const Web3 = require("web3");
const web3 = new Web3(RPC_URL);
// 0x5D4cBeaF9C783eFF1740eA08e80E4158ecC5f9cb

function DetailBox(props) {
  return (
    <div className="text-left pl-2 detailBox">
      <p>My account: {props.acc.account}</p>
      <p>Available balance: {props.balance}</p>
    </div>
  );
}
export default function Details() {
  const account = useSelector(selectAccount);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (account != "") {
      try {
        web3.eth.getBalance(account.account).then(response=>setBalance(web3.utils.fromWei(response,'ether')+" eth"))
      } catch {
        setBalance(0);
        alert("Invalid account");
      }
    }
  },[account]);
  if (account != "") {
  }
  return account === "" ? (
    <div></div>
  ) : (
    <DetailBox acc={account} balance={balance}></DetailBox>
  );
}
