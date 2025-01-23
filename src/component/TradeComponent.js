"use client";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "@/src/context/SnackbarContext";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import fetcher from "@/src/dataProvider";
import { FANTV_API_URL } from "@/src/constant/constants";
import BondingCurve from "./BondingCurve";

const TradeComponent = () => {
  const { openSnackbar } = useSnackbar();
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [amount, setAmount] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [error, setError] = useState("");

  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

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
      const response = await fetcher.get(
        `${FANTV_API_URL}/v1/trade/${
          isBuyMode ? "buy" : "sell"
        }-receive?ticker=%24MSC1&amount=${value}`
      );
      setReceivedAmount(response.data.value);
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

      await signAndExecuteTransaction(
        {
          transaction: new Transaction(),
          chain: "sui:testnet",
        },
        {
          onSuccess: (result) => {
            console.log("executed transaction", result);
            setDigest(result.digest);
          },
        },
        {
          onError: (error) => {
            console.error("Transaction failed:", error);
            openSnackbar("error", error.message || "Transaction failed. Please try again.");
          },
        }
      );
      const response = await fetcher.post(
        `${FANTV_API_URL}/v1/trade/${isBuyMode ? "buy" : "sell"}`,
        {
          ticker: "$MSC1",
          amount,
        }
      );
      if (response.message === "success") {
        openSnackbar("success", "Trade placed successfully");
      }
    } catch (error) {
      console.error("Error placing trade:", error);
      openSnackbar("error", error.message || "Trade failed. Please try again later");
    } finally {
      setTradeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6">
        <div layout className="flex rounded-full bg-[#333333] p-1.5 mb-6">
          <button
            layout
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
              isBuyMode ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsBuyMode(true)}
          >
            Buy
          </button>
          <button
            layout
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
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
              <span className="text-gray-400">Slippage: 12%</span>
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
