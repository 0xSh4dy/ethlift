import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAccount } from "../features/accountSlice";
import { RPC_URL, SEP_PVT_KEY } from "../app/vals";
import { Buffer } from "buffer";
import { Circles } from "react-loader-spinner";
import Web3 from "web3";
const web3 = new Web3(RPC_URL);

export default function Transfer() {
  const [formDetails, setFormDetails] = useState({
    receiver: "",
    amount: "",
    message: "",
  });
  const acct = useSelector(selectAccount);
  const [enabled, setEnabled] = useState(true);
  const [fileDownload, setFileDownload] = useState("");
  const [fileName, setFilename] = useState("");
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  // 0x1Afe4901Da34CB442E06f307aBC9bc19E080a681
  async function SendTransaction() {
    if (enabled === false) {
      alert("Processing previous transaction, please wait");
      return;
    }
    const privateKey = SEP_PVT_KEY;
    let transactionCount;
    try{
      transactionCount = await web3.eth
      .getTransactionCount(acct.account)
      .catch((err) => {
        alert(err);
        setEnabled(true);
        return;
      });
    }
    catch(error){
      alert("Invalid account! Please setup your account before sending transactions");
      return;
    }
    setEnabled(false);

    try {
     
      const transactionObject = {
        nonce: web3.utils.toHex(transactionCount),
        to: formDetails.receiver,
        from: acct.account,
        value: web3.utils.toHex(web3.utils.toWei(formDetails.amount, "ether")),
        data: web3.utils.toHex(formDetails.message),
        gasLimit: web3.utils.toHex("22000"),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      };
      const signedTransaction = await web3.eth.accounts
        .signTransaction(transactionObject, privateKey)
        .catch((err) => {
          alert(err);
          setEnabled(true);
          return;
        });
      const receipt = await web3.eth
        .sendSignedTransaction(signedTransaction.rawTransaction)
        .catch((err) => {
          alert(err);
          setEnabled(true);
          return;
        });

      alert(
        `Transaction successful! Please download the receipt within 10 seconds`
      );
      setEnabled(true);
      setDownloadEnabled(true);
      setFilename(receipt.transactionHash + ".txt");
      setFileDownload(
        "data:application/octet-stream," + JSON.stringify(receipt)
      );
      setTimeout(() => {
        setFileDownload("");
        setFilename("");
        setDownloadEnabled(false);
      }, 10000);
    } catch (error) {
      alert(error);
      setEnabled(true);
      return;
    }
    setFormDetails({
      receiver: "",
      amount: "",
      message: "",
    });
  }

  return (
    <div>
      <div className="transferBox w-fit p-4 rounded-2xl">
        <p className="lds-roller"></p>
        <input
          className="block mt-2 p-2 rounded-2xl"
          type="text"
          placeholder="Receiver's account"
          onChange={(e) => {
            setFormDetails({ ...formDetails, receiver: e.target.value });
          }}
          value={formDetails.receiver}
        />
        <input
          className="block mt-2 p-2 rounded-2xl"
          type="text"
          value={formDetails.amount}
          placeholder="Amount (ether)"
          onChange={(e) => {
            setFormDetails({ ...formDetails, amount: e.target.value });
          }}
        />
        <input
          value={formDetails.message}
          className="block mt-2 p-2 rounded-2xl"
          type="text"
          placeholder="Message"
          onChange={(e) => {
            setFormDetails({ ...formDetails, message: e.target.value });
          }}
        />
        <button
          onClick={SendTransaction}
          className="bg-white w-full mt-2 p-2 rounded-2xl bg-[#0ea5e9] text-white"
        >
          Send Transaction
        </button>

        <Circles
          height="10vh"
          width="10vw"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="wrapperLoading"
          visible={!enabled}
        />
        <span hidden={enabled} className="text-2xl text-[#1e40af]">
          Processing...
        </span>
        <a
          className="text-[blue]  text-xl mt-4 ml-2"
          href={fileDownload}
          download={fileName}
          hidden={!downloadEnabled}
        >
          Download Receipt
        </a>
      </div>
    </div>
  );
}
