'use client';
import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FANTV_API_URL } from '../../../src/constant/constants';
import { formatWalletAddress, getFormattedDate } from '../../utils/common';
import { useMediaQuery } from '@mui/material';

const TradeTable = ({ agentDetail }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [expandedRowId, setExpandedRowId] = useState(null);
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
    const url = `https://suivision.xyz/txblock/${value}`;
    window.open(url, '_blank');
  };

  const handleAddressClick = (e, address) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    const url = `https://suivision.xyz/address/${address}`;
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

  const MobileTradeCard = ({ tx }) => {
    return (
      <div className='border-b border-gray-800/50'>
        <div
          onClick={() =>
            setExpandedRowId(expandedRowId === tx._id ? null : tx._id)
          }
          className='flex items-center justify-between px-1 py-4 cursor-pointer hover:bg-gray-800/20'
        >
          <div className='flex items-center'>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleAddressClick(e, tx.sender);
              }}
              className='flex items-center'
            >
              <div className='w-6 h-6'>
                <svg
                  viewBox='0 0 24 24'
                  className='w-full h-full text-[#CCFF00]'
                >
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
                {formatWalletAddress(tx.sender, 5)}
              </span>
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded text-sm ${
              tx.transactionType === 'BUY' ? 'text-green-100' : 'text-red-400'
            }`}
          >
            {tx.transactionType}
          </span>
          {expandedRowId === tx._id ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </div>

        {expandedRowId === tx._id && (
          <div className='grid grid-cols-2 gap-3 p-2 bg-gray-800/10'>
            <div className='flex flex-col p-3 rounded bg-gray-800/20'>
              <span className='text-xs font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                $MAN
              </span>
              <span className='mt-1 font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                {tx?.suiAmount?.toLocaleString()}
              </span>
            </div>
            <div className='flex flex-col p-3 rounded bg-gray-800/20'>
              <span className='text-xs font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                {agentDetail?.ticker}
              </span>
              <span className='mt-1 font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                {tx?.coinAmount?.toLocaleString()}
              </span>
            </div>
            {/* <div className='flex flex-col p-3 rounded bg-gray-800/20'>
              <span className='text-xs text-gray-400'>Date</span>
              <span className='mt-1 text-sm'>
                {getFormattedDate(tx.createdAt)}
              </span>
            </div> */}
            <div
              className='flex flex-col p-3 rounded cursor-pointer bg-gray-800/20'
              onClick={() => handleTradeClick(tx.digest)}
            >
              <span className='text-xs font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                Transaction
              </span>
              <span className='mt-1 font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                {formatWalletAddress(tx.digest.slice(0, 12))}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='bg-[#222222] text-white rounded-lg'>
      {isMobile ? (
        // Mobile Layout with Dropdowns
        <div className='divide-y divide-gray-800/50'>
          {tradeHistory?.map((tx) => (
            <MobileTradeCard key={tx.id} tx={tx} />
          ))}
        </div>
      ) : (
        // Desktop Layout (unchanged)
        <table className='w-full'>
          <thead>
            <tr className='w-full text-gray-400 border-b border-gray-800'>
              <th className='py-4 font-medium text-left font-nohemi text-[14px] leading-[21px]'>
                ACCOUNT
              </th>
              <th className='py-4 font-medium text-center font-nohemi text-[14px] leading-[21px]'>
                TYPE
              </th>
              <th className='py-4 font-medium text-center font-nohemi text-[14px] leading-[21px]'>
                $MAN
              </th>
              <th className='py-4 font-medium text-center font-nohemi text-[14px] leading-[21px]'>
                {agentDetail?.ticker}
              </th>
              <th className='py-4 font-medium text-center font-nohemi text-[14px] leading-[21px]'></th>
              <th className='py-4 font-medium text-center font-nohemi text-[14px] leading-[21px]'>
                TRANSACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory?.map((tx) => (
              <tr
                onClick={() => handleTradeClick(tx.digest)}
                key={tx._id}
                className='border-b cursor-pointer border-gray-800/50 hover:bg-gray-800/20'
              >
                <td className='py-4 text-left font-nohemi text-[14px] font-normal leading-[21px]'>
                  <AccountCell account={tx.sender} />
                </td>
                <td
                  className={`py-4 text-center font-nohemi text-[14px] font-normal
leading-[21px] ${
                    tx.transactionType === 'BUY'
                      ? 'text-green-100'
                      : 'text-red-400'
                  }}`}
                >
                  {tx.transactionType}
                </td>
                <td className='py-4 text-center text-[#D2D2D2] font-nohemi text-[14px] font-normal leading-[21px]'>
                  {tx?.suiAmount?.toLocaleString()}
                </td>
                <td className='py-4 text-center text-[#D2D2D2] font-nohemi text-[14px] font-normal leading-[21px]'>
                  {tx?.coinAmount?.toLocaleString()}
                </td>
                <td className='py-4 text-center text-gray-400'>
                  {/* {getFormattedDate(tx.createdAt)} */}
                </td>
                <td className='py-4 text-center text-[#D2D2D2] font-nohemi text-[14px] font-normal leading-[21px]'>
                  {formatWalletAddress(tx.digest, 5)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
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
