'use client';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from '@/src/context/SnackbarContext';
import { Transaction } from '@mysten/sui/transactions';
import fetcher from '@/src/dataProvider';
import { FANTV_API_URL } from '@/src/constant/constants';
import BondingCurve from './BondingCurve';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';

const TradeComponent = ({ agentDetail, graphData }) => {
  const { openSnackbar } = useSnackbar();
  const [orderId, setOrderId] = useState('');
  let globalOrderId;
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [amount, setAmount] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [error, setError] = useState('');
  const [disgest, setDigest] = useState('');
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // Fetch balance when account changes

  const fetchBalance = async (address) => {
    try {
      const response = await fetch('https://fullnode.mainnet.sui.io/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-sdk-type': 'typescript',
          'client-sdk-version': '1.7.0',
          'client-target-api-version': '1.32.0',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 3,
          method: 'suix_getBalance',
          params: [address, agentDetail?.parentId],
        }),
      });
      const data = await response.json();
      if (data.result && data.result.totalBalance) {
        setBalance(Number(data.result.totalBalance) / 1e9);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      openSnackbar('error', 'Failed to fetch balance');
    }
  };

  useEffect(() => {
    if (currentAccount?.address) {
      fetchBalance(currentAccount.address);
    }
  }, [currentAccount]);

  const getToken = () => {
    if (
      typeof window !== 'undefined' &&
      (localStorage.getItem('accessToken') ||
        localStorage.getItem('guestAccessToken'))
    ) {
      let token = localStorage.getItem('accessToken');

      if (!!!token) {
        let guestAccesToken = localStorage.getItem('guestAccessToken');
        return guestAccesToken;
      }
      return token;
    }
  };

  const postDigest = async (digest) => {
    try {
      const response = await fetch(
        `${FANTV_API_URL}/v1/trade/order/${globalOrderId || globalOrderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'client-sdk-type': 'typescript',
            'client-sdk-version': '1.7.0',
            'client-target-api-version': '1.32.0',
            Authorization: 'Bearer ' + getToken(),
          },
          body: JSON.stringify({ digest: digest }),
        }
      );
      const data = await response.json();
      if (data.result && data.result.totalBalance) {
        setBalance(Number(data.result.totalBalance) / 1e9);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      openSnackbar('error', 'Failed to fetch balance');
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
      setReceivedAmount('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await fetcher.get(
        `${FANTV_API_URL}/v1/trade/${
          isBuyMode ? 'buy' : 'sell'
        }-receive?ticker=${agentDetail.ticker}&amount=${value}`
      );
      setReceivedAmount(response.data.value);
      globalOrderId = response.data.orderId;
      setOrderId(response.data.orderId);
    } catch (error) {
      console.error('Error fetching receive amount:', error);
      setError('Failed to calculate received amount');
      setReceivedAmount('');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const setPercentageAmount = (percentage) => {
    const value = (parseFloat(balance) * percentage).toFixed(4);
    setAmount(value);
    fetchReceivedAmount(value);
  };

  const handleTransaction = async (data) => {
    const tx = new Transaction();

    try {
      const response = await fetch('https://fullnode.mainnet.sui.io/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-sdk-type': 'typescript',
          'client-sdk-version': '1.7.0',
          'client-target-api-version': '1.32.0',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'suix_getCoins',
          params: [
            currentAccount.address,
            isBuyMode ? agentDetail.parentId : agentDetail.tickerId,
          ],
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

        if (totalBalance > parseFloat(amount * 1000000)) {
          if (coinsToMerge.length > 0) {
            tx.mergeCoins(
              tx.object(primaryCoin),
              coinsToMerge.map((coin) => tx.object(coin))
            );
          }
        }

        const [coin] = tx.splitCoins(primaryCoin, [
          tx.pure.u64(BigInt(parseFloat(amount * 1000000))),
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
              openSnackbar('success', 'Transaction successful');
              setDigest(result.digest);
              postDigest(result.digest);
              setError('');
            },
            onError: (err) => {
              console.error('Transaction failed:', err);
              setError(err.message);
            },
          }
        );
      }
    } catch (err) {
      console.error('Failed to create transaction:', err);
      setError(err.message);
    }
  };

  const placeTrade = async () => {
    // if (!balance) {
    //   openSnackbar("error", "Error: Insufficient Token");
    //   return;
    // }

    // if (!amount || parseFloat(amount) <= 0) {
    //   openSnackbar("error", "Please enter a valid amount");
    //   return;
    // }

    // if (!currentAccount) {
    //   openSnackbar("error", "Please connect your wallet to place trade");
    //   return;
    // }

    try {
      setTradeLoading(true);
      setError('');
      const response = await fetcher.post(
        `${FANTV_API_URL}/v1/trade/${isBuyMode ? 'buy' : 'sell'}`,
        {
          ticker: agentDetail.ticker,
          amount,
        }
      );

      openSnackbar('warning', 'Please approve the transaction.');

      handleTransaction(response.data);
    } catch (error) {
      console.error('Error placing trade:', error);
      openSnackbar('error', 'Trade failed. Please try again later');
    } finally {
      setTradeLoading(false);
    }
  };

  return (
    <div className='w-full space-y-6'>
      <div className='bg-[#222222] w-full   border-[2px] border-[#FFFFFF]/15 rounded-xl p-6'>
        <div layout className='flex rounded-full bg-[#333333] p-2 mb-6'>
          <button
            layout
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              isBuyMode
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsBuyMode(true)}
          >
            Buy
          </button>
          <button
            layout
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
              !isBuyMode
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setIsBuyMode(false)}
          >
            Sell
          </button>
        </div>

        {/* Amount Section */}
        <div className='mb-6'>
          <div className='flex justify-between mb-3 text-sm'>
            <div className='flex items-center gap-1'>
              <span>Amount</span>
              {/* <span className="font-normal text-gray-400">Slippage:</span>
              <span style={{ color: agentDetail?.change24?.color }}>
                {agentDetail?.change24?.text}
              </span> */}
            </div>
            <div className='flex items-center gap-2'>
              {['0', '50', '100'].map((percent) => (
                <button
                  key={percent}
                  className='px-2 py-1 rounded bg-[#2A2A2A] text-xs'
                  onClick={() => setPercentageAmount(parseInt(percent) / 100)}
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>
          <div className='relative'>
            <input
              type='text'
              value={amount}
              onChange={handleAmountChange}
              className={`w-full bg-[#2A2A2A] rounded-xl p-4 transition-colors ${
                error ? 'border-red-500' : 'border-transparent'
              }`}
              placeholder='0.0'
            />
            <div className='absolute flex items-center gap-2 -translate-y-1/2 right-4 top-1/2'>
              <img
                profilePic
                src={
                  isBuyMode
                    ? `${agentDetail?.parentUrl}`
                    : `${agentDetail?.profilePic}`
                }
                alt='COIN_ICON'
                className='w-[16px] h-[16px]'
              />
              <span className='text-sm'>
                {isBuyMode
                  ? `${agentDetail?.parentSymbol}`
                  : `${agentDetail?.ticker}`}
              </span>
            </div>
          </div>
        </div>

        {/* You Receive Section */}
        <div className='mb-6'>
          <div className='mb-3 text-sm'>You Receive</div>
          <div className='relative'>
            <input
              type='text'
              value={loading ? 'Calculating...' : receivedAmount}
              readOnly
              className='w-full bg-[#2A2A2A] rounded-xl p-4'
              placeholder='0.0'
            />
            <div className='absolute flex items-center gap-2 -translate-y-1/2 right-4 top-1/2'>
              <img
                src={
                  !isBuyMode
                    ? `${agentDetail?.parentUrl}`
                    : `${agentDetail?.profilePic}`
                }
                alt='SUI'
                className='w-[16px] h-[16px]'
              />
              <span className='text-sm'>
                {!isBuyMode
                  ? `${agentDetail?.parentSymbol}`
                  : `${agentDetail?.ticker}`}
              </span>
            </div>
          </div>
        </div>

        <button
          className='w-full py-4 rounded-full bg-[#CCFF00] text-black transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={placeTrade}
          disabled={tradeLoading || !amount || loading || amount <= 0.0}
        >
          {tradeLoading ? (
            <div className='flex items-center justify-center gap-2'>
              <span className='animate-spin'>↻</span>
              Processing...
            </div>
          ) : (
            'Place Trade'
          )}
        </button>
      </div>
      <BondingCurve graphData={graphData} />
    </div>
  );
};

export default TradeComponent;
