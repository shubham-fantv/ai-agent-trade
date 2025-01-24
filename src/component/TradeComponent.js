"use client";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "@/src/context/SnackbarContext";
import { Transaction } from "@mysten/sui/transactions";
import fetcher from "@/src/dataProvider";
import { FANTV_API_URL } from "@/src/constant/constants";
import BondingCurve from "./BondingCurve";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";

const TradeComponent = ({ticker}) => {
  const { openSnackbar } = useSnackbar();
  const [orderId, setOrderId] = useState("");
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [amount, setAmount] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [error, setError] = useState("");
  const [disgest, setDigest] = useState("");
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  console.log("🚀 ~ TradeComponent ~ currentAccount:", currentAccount);

  // Fetch balance when account changes
  useEffect(() => {
    if (currentAccount?.address) {
      fetchBalance(currentAccount.address);
    }
  }, [currentAccount]);

  const fetchBalance = async (address) => {
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
          id: 3,
          method: "suix_getBalance",
          params: [
            address,
            "0xbc732bc5f1e9a9f4bdf4c0672ee538dbf56c161afe04ff1de2176efabdf41f92::suai::SUAI",
          ],
        }),
      });
      const data = await response.json();
      if (data.result && data.result.totalBalance) {
        setBalance(Number(data.result.totalBalance) / 1e9);
        console.log(balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      openSnackbar("error", "Failed to fetch balance");
    }
  };
  const postDigest = async (digest) => {
    try {
      const response = await fetch(`${FANTV_API_URL}/v1/trade/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "client-sdk-type": "typescript",
          "client-sdk-version": "1.7.0",
          "client-target-api-version": "1.32.0",
        },
        body: JSON.stringify({
          digest: digest,
        }),
      });
      const data = await response.json();
      if (data.result && data.result.totalBalance) {
        setBalance(Number(data.result.totalBalance) / 1e9);
        console.log(balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      openSnackbar("error", "Failed to fetch balance");
    }
  };

  // Debounced amount for API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (amount) {
        fetchReceivedAmount(amount);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [amount, isBuyMode]);

  const fetchReceivedAmount = async (value) => {
    if (!value || value <= 0) {
      setReceivedAmount("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log(value, receivedAmount, isBuyMode)
      const response = await fetcher.get(
        `${FANTV_API_URL}/v1/trade/${
          isBuyMode ? "buy" : "sell"
        }-receive?ticker=${ticker}&amount=${
          isBuyMode ? value : receivedAmount
        }`
      );
      setReceivedAmount(response.data.value);
      setOrderId(response.data.orderId);
    } catch (error) {
      console.error("Error fetching receive amount:", error);
      setError("Failed to calculate received amount");
      setReceivedAmount("");
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const setPercentageAmount = (percentage) => {
    const value = (parseFloat(balance) * percentage).toFixed(4);
    setAmount(value);
    fetchReceivedAmount(value);
  };

  const handleTransaction = async (data) => {
    try {
      const tx = new Transaction();
      const [coin] = tx.splitCoins(data?.splitObject, [
        tx.pure.u64(BigInt(parseFloat(data?.arguments?.[2]))),
      ]);
      tx.moveCall({
        package: data?.package,
        package: data?.package,
        module: data?.module,
        typeArguments: data?.typeArguments,
        function: data?.function,
        arguments: [
          tx.object(data?.arguments?.[0]),
          tx.object(data?.arguments?.[1]),
          tx.pure.u64(BigInt(parseFloat(data?.arguments?.[2]))),
          tx.object(coin),
        ],
        gasBudget: 1000000000,
      });
      signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log("Transaction executed:", result);
            openSnackbar("success", "Transaction successful");
            setDigest(result.digest);
            postDigest(result.digest);
            setError("");
          },
          onError: (err) => {
            console.error("Transaction failed:", err);
            setError(err.message);
          },
        }
      );
    } catch (err) {
      console.error("Failed to create transaction:", err);
      setError(err.message);
    }
  };

  const placeTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      openSnackbar("error", "Please enter a valid amount");
      return;
    }

    if (!currentAccount) {
      openSnackbar("error", "Please connect your wallet to place trade");
      return;
    }

    try {
      setTradeLoading(true);
      setError("");
      const response = await fetcher.post(
        `${FANTV_API_URL}/v1/trade/${isBuyMode ? "buy" : "sell"}`,
        {
          ticker: "$MSC1",
          amount,
        }
      );

      openSnackbar("warning", "Please approve the transaction.");

      handleTransaction(response.data);
    } catch (error) {
      console.error("Error placing trade:", error);
      openSnackbar("error", error.message || "Trade failed. Please try again later");
    } finally {
      setTradeLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="bg-[#222222] w-full   border-[2px] border-[#FFFFFF]/15 rounded-xl p-6">
        <div layout className="flex rounded-full bg-[#333333] p-2 mb-6">
          <button
            layout
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              isBuyMode ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsBuyMode(true)}
          >
            Buy
          </button>
          <button
            layout
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              !isBuyMode ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsBuyMode(false)}
          >
            Sell
          </button>
        </div>

        {/* Amount Section */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-3">
            <div className="flex items-center gap-1">
              <span>Amount</span>
              <span className="text-gray-400 font-normal">Slippage: 12%</span>
            </div>
            <div className="flex items-center gap-2">
              {["0", "50", "100"].map((percent) => (
                <button
                  key={percent}
                  className="px-2 py-1 rounded bg-[#2A2A2A] text-xs"
                  onClick={() => setPercentageAmount(parseInt(percent) / 100)}
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full bg-[#2A2A2A] rounded-xl p-4 transition-colors ${
                error ? "border-red-500" : "border-transparent"
              }`}
              placeholder="0.0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <img src="/images/sui.svg" alt="SUI" className="w-[16px] h-[16px]" />
              <span className="text-sm">{isBuyMode ? "SUI" : "MONA"}</span>
            </div>
          </div>
        </div>

        {/* You Receive Section */}
        <div className="mb-6">
          <div className="text-sm mb-3">You Receive</div>
          <div className="relative">
            <input
              type="text"
              value={loading ? "Calculating..." : receivedAmount}
              readOnly
              className="w-full bg-[#2A2A2A] rounded-xl p-4"
              placeholder="0.0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <img src="/images/sui.svg" alt="SUI" className="w-[16px] h-[16px]" />
              <span className="text-sm">{!isBuyMode ? "SUI" : "MONA"}</span>
            </div>
          </div>
        </div>

        <button
          className="w-full py-4 rounded-full bg-[#CCFF00] text-black transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={placeTrade}
          disabled={tradeLoading || !amount || loading}
        >
          {tradeLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin">↻</span>
              Processing...
            </div>
          ) : (
            "Place Trade"
          )}
        </button>
      </div>
      <BondingCurve />
    </div>
  );
};

export default TradeComponent;
