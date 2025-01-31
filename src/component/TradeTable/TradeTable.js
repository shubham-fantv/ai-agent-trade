'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FANTV_API_URL } from '../../../src/constant/constants';
import { formatWalletAddress, getFormattedDate } from '../../utils/common';

const TradeTable = ({ agentDetail }) => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentCursor, setCurrentCursor] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const url = `${FANTV_API_URL}/v1/trade/history?ticker=${agentDetail?.ticker}`;
        const response = await fetch(url);
        const json = await response.json();

        setTradeHistory(json?.data?.txnHistory);
        setNextCursor(json?.data?.pageInfo?.nextCursor || null);
        setPrevCursor(json?.data?.pageInfo?.prevCursor || null);
        setTotalCount(json?.data?.pageInfo?.count);
        setHasNextPage(json?.data?.pageInfo?.hasNext);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, [agentDetail?.ticker]);

  // Handle pagination
  useEffect(() => {
    const fetchPaginatedData = async () => {
      if (currentCursor) {
        try {
          const url = `${FANTV_API_URL}/v1/trade/history?ticker=${agentDetail?.ticker}&cursor=${currentCursor}`;
          const response = await fetch(url);
          const json = await response.json();

          setTradeHistory(json?.data?.txnHistory);
          setNextCursor(json?.data?.pageInfo?.nextCursor || null);
          setPrevCursor(json?.data?.pageInfo?.prevCursor || null);
          setTotalCount(json?.data?.pageInfo?.count);
          setHasNextPage(json?.data?.pageInfo?.hasNext);
        } catch (error) {
          console.error('Error fetching paginated data:', error);
        }
      }
    };

    fetchPaginatedData();
  }, [currentCursor, agentDetail?.ticker]);

  const handleNextPage = () => {
    if (nextCursor) {
      setCurrentCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (prevCursor) {
      setCurrentCursor(prevCursor);
    }
  };

  const handleTradeClick = (value) => {
    console.log('click', value);
    const url = `https://suivision.xyz/txblock/${value}`;
    console.log(url);
    window.open(url, '_blank');
  };

  const AccountCell = ({ account }) => (
    <div className='flex items-center space-x-2'>
      <div className='w-6 h-6'>
        <svg viewBox='0 0 24 24' className='w-full h-full text-[#CCFF00]'>
          <rect
            width='24'
            height='24'
            fill='currentColor'
            opacity='0.2'
            rx='12'
          />
          <path
            fill='currentColor'
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
          />
        </svg>
      </div>
      <span className='font-mono text-[#CCFF00]'>
        {formatWalletAddress(account, 5)}
      </span>
    </div>
  );

  console.log(tradeHistory, 'his');
  return (
    <div className='bg-[#222222] text-white rounded-lg'>
      <table className='w-full'>
        <thead>
          <tr className='w-full text-gray-400 border-b border-gray-800'>
            <th className='py-4 font-medium text-left'>ACCOUNT</th>
            <th className='py-4 font-medium text-center'>TYPE</th>
            <th className='py-4 font-medium text-right'>$MAN</th>
            <th className='py-4 font-medium text-right'>
              {agentDetail?.ticker}
            </th>
            <th className='py-4 font-medium text-center'>DATE</th>
            <th className='py-4 font-medium text-right'>TRANSACTION</th>
          </tr>
        </thead>
        <tbody>
          {tradeHistory?.map((tx) => (
            <tr
              onClick={() => handleTradeClick(tx.digest)}
              key={tx.id}
              className='border-b cursor-pointer border-gray-800/50 hover:bg-gray-800/20'
            >
              <td className='py-4 text-left'>
                <AccountCell account={tx.sender} />
              </td>
              <td
                className={`py-4 text-center ${
                  tx.transactionType === 'BUY'
                    ? 'text-cyan-400'
                    : 'text-red-400'
                }`}
              >
                {tx.transactionType}
              </td>
              <td className='py-4 font-mono text-right'>
                {tx?.suiAmount?.toLocaleString()}
              </td>
              <td className='py-4 font-mono text-right'>
                {tx?.coinAmount?.toLocaleString()}
              </td>
              <td className='py-4 text-center text-gray-400'>
                {getFormattedDate(tx.createdAt)}
              </td>
              <td className='py-4 font-mono text-right text-gray-400'>
                {formatWalletAddress(tx.digest.slice(0, 12))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center justify-center my-6'>
        <div className='flex items-center space-x-4'>
          <button
            className={`p-2 text-gray-400 hover:text-white ${
              !prevCursor && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!prevCursor}
            onClick={handlePrevPage}
          >
            <ChevronLeft size={20} />
          </button>
          <span className='text-gray-400'>{totalCount}</span>
          <button
            className={`p-2 text-gray-400 hover:text-white ${
              !nextCursor && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!hasNextPage}
            onClick={handleNextPage}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeTable;
