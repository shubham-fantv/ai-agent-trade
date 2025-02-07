import React, { useState } from "react";
import { FANTV_API_URL } from "../constant/constants";
import { useSnackbar } from "@/src/context/SnackbarContext";
import { Transaction } from "@mysten/sui/transactions";
import fetcher from "@/src/dataProvider";

import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";

import axios from "axios";

const CreateAgentModal = ({ open, handleClose }) => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const { openSnackbar } = useSnackbar();
  const currentAccount = useCurrentAccount();
  console.log("🚀 ~ CreateAgentModal ~ currentAccount:", currentAccount?.address);

  const [formData, setFormData] = useState({
    agentName: "",
    ticker: "",
    amount: "",
    description: "",
    image: null,
    x: "",
    telegram: "",
    website: "",
    agentAge: "",
    personality: "",
    firstMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange1 = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit1 = () => {
    console.log(formData);
    handleClose();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image: file }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://upload.artistfirst.in/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, imageUrl: response?.data?.data?.[0]?.url }));
    } catch (error) {
      console.error("Image upload failed:", error);
      openSnackbar("error", "Image upload failed");
    }
  };

  const handleCreateAgent = async (digest) => {
    const tx = new Transaction();
    try {
      const data = await fetcher.post(`${FANTV_API_URL}/v1/agent/start-new-coin`, {
        txDigest: digest,
        ticker: formData.ticker,
      });
      console.log("Agent created successfully:", data.data);
      try {
        const response = await fetch("https://fullnode.mainnet.sui.io/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "client-sdk-type": "typescript",
            "client-sdk-version": "1.7.0",
            "client-target-api-version": "1.32.0",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "suix_getCoins",
            params: [currentAccount.address, data.data.tokenId],
          }),
        });
        const mergeData = await response.json();
        if (mergeData.result) {
          const totalBalance = mergeData.result.data.reduce((sum, coin) => {
            return sum + parseFloat(coin.balance);
          }, 0);

          const allCoins = mergeData.result.data.map((coin) => coin.coinObjectId);
          const primaryCoin = allCoins[0]; // Choose the first coin as the primary
          const coinsToMerge = allCoins.slice(1); // Use the rest for merging

          if (totalBalance > parseFloat(formData.amount * 1000000)) {
            if (coinsToMerge.length > 0) {
              tx.mergeCoins(
                tx.object(primaryCoin),
                coinsToMerge.map((coin) => tx.object(coin))
              );
            }
          }

          const [coin, coin0] = tx.splitCoins(primaryCoin, [
            tx.pure.u64(BigInt(parseFloat(formData.amount * 1000000))),
            tx.pure.u64(BigInt(parseFloat(0))),
          ]);

          tx.moveCall({
            package: data?.data?.package,
            module: data?.data?.module,
            typeArguments: data?.data?.typeArguments,
            function: data?.data?.function,
            arguments: [
              tx.pure(data?.data?.arguments?.[0]),
              tx.pure(data?.data?.arguments?.[1]),
              tx.pure.u64(BigInt(parseFloat(data?.data?.arguments?.[2]))),
              tx.pure(coin),
              tx.pure(coin0),
              tx.pure(data?.data?.arguments?.[5]),
              tx.pure(data?.data?.arguments?.[6]),
              tx.pure(data?.data?.arguments?.[7]),
              tx.pure(data?.data?.arguments?.[8]),
              tx.pure(data?.data?.arguments?.[9]),
              tx.pure(data?.data?.arguments?.[10]),
              tx.pure(data?.data?.arguments?.[11]),
              tx.pure(data?.data?.arguments?.[12]),
              tx.pure(data?.data?.arguments?.[13]),
              tx.pure(data?.data?.arguments?.[14]),
              tx.pure(data?.data?.arguments?.[15]),
            ],
            gasBudget: 100000000,
          });

          signAndExecuteTransaction(
            {
              transaction: tx,
            },
            {
              onSuccess: (result) => {
                openSnackbar("success", "Transaction successful");
              },
              onError: (err) => {
                console.error("Transaction failed:", err);
                // setError(err.message);
              },
            }
          );
        }
      } catch (err) {
        console.error("Failed to create transaction:", err);
        // setError(err.message);
      }

      openSnackbar("success", "Agent Created");
      handleClose();
    } catch (error) {
      console.error("Error creating agent:", error);
      openSnackbar("error", "Agent creation failed");
    }
  };

  const handleSubmit = async () => {
    const tx = new Transaction();
    try {
      const response = await fetcher.post(`${FANTV_API_URL}/v1/agent/contract-deployment`, {
        name: formData.agentName,
        ticker: formData.ticker,
        amount: formData.amount,
        description: formData.description,
        imageUrl: formData.imageUrl,

        // twitter: formData.x,
        // telegram: formData.telegram,
        // website: formData.website,
        // agentAge: formData.agentAge,
        // personality: formData.personality,
        // firstMessage: formData.firstMessage,
      });

      console.log("Agent created successfully:", response.data.transactionBlock);

      const [upgradeCap] = tx.publish({
        modules: [response?.data?.txnsCode],
        dependencies: ["0x1", "0x2"],
        options: {
          showObjectChanges: true,
          showInput: true,
        },
      });

      tx.transferObjects([upgradeCap], tx.pure.address(currentAccount?.address)),
        signAndExecuteTransaction(
          {
            transaction: tx,
          },
          {
            onSuccess: async (result) => {
              console.log("🚀 ~ handleSubmit ~ result:", result);
              handleCreateAgent(result.digest);
              openSnackbar("success", "Transaction successful");
            },
            onError: (err) => {
              console.error("Transaction failed:", err);
              // setError(err.message);
            },
          }
        );

      openSnackbar("success", "Agent Created");
      handleClose();
    } catch (error) {
      console.error("Error creating agent:", error);
      openSnackbar("error", "Agent creation failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-[#1E1E1EB2] z-[99] backdrop-blur-sm ">
      <div className="bg-[#353535] relative  text-white p-8 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2
          className="text-center text-[40px] font-bold mb-4"
          style={{ fontFamily: "BricolageGrotesque" }}
        >
          CREATE AGENT
        </h2>
        <div
          style={{
            alignItems: "center",
            position: "absolute",
            right: "20px",
            top: "30px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          <img style={{ height: "32px", width: "32px" }} src="/images/close.svg" />
        </div>
        <p className="text-sm text-gray-400 mb-4 mt-2">
          Fee: 6900 FANTs &nbsp; My Balance: 20,0000 FANTs
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-normal mb-4">AI Agent Name*</label>
            <input
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              className="w-full p-2 bg-[#1E1E1E] h-[44px] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Ticker*</label>
            <input
              type="text"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Amount*</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Image*</label>
            <div className="w-1/3 h-[200px] flex items-center justify-center text-center p-4 rounded-xl bg-[#1E1E1E] cursor-pointer">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <label htmlFor="upload" className="block">
                  <p>Upload here</p>
                  <p className="text-xs">PNG, JPG, WEBP max 100KB</p>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept=".png,.jpg,.webp"
                    className="hidden"
                    id="upload"
                  />
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">X</label>
            <input
              type="text"
              name="x"
              value={formData.x}
              onChange={handleChange}
              className="w-full h-[44px] p-2 bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Telegram</label>
            <input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Agent Age</label>
            <input
              type="text"
              name="agentAge"
              value={formData.agentAge}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">Personality</label>
            <input
              type="text"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-4">First Message</label>
            <textarea
              name="firstMessage"
              value={formData.firstMessage}
              onChange={handleChange}
              className="w-full p-2 h-[44px] bg-[#1E1E1E] rounded-xl text-[#D2D2D2] font-normal outline-none"
              rows="3"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#a3d64b] justify-self-end flex text-[#1E1E1E] font-normal px-4  py-3 rounded-full mt-4"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;
