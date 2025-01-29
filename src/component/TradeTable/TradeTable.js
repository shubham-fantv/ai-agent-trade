'use client';
import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

// Static dummy data
const TRANSACTIONS_DATA = [
  {
    id: '1',
    account: '0x46ef43',
    type: 'BUY',
    suai: '2122333',
    aida: '102511664',
    date: '1 months ago',
    transactionId: '7g2KmY',
  },
  {
    id: '2',
    account: 'edelarandreazza',
    type: 'BUY',
    suai: '1000',
    aida: '64816',
    date: '1 months ago',
    transactionId: '2F5WTM',
  },
  {
    id: '3',
    account: '0x46ef43',
    type: 'BUY',
    suai: '4933',
    aida: '320048',
    date: '1 months ago',
    transactionId: 'HFKy5n',
  },
  {
    id: '4',
    account: '0xeff654',
    type: 'BUY',
    suai: '80632',
    aida: '5304379',
    date: '1 months ago',
    transactionId: 'DVxRX9',
  },
  {
    id: '5',
    account: '0x77939b',
    type: 'SALE',
    suai: '11397',
    aida: '773606',
    date: '1 months ago',
    transactionId: 'F1spna',
  },
  {
    id: '6',
    account: '0x46ef43',
    type: 'BUY',
    suai: '2122333',
    aida: '102511664',
    date: '1 months ago',
    transactionId: '7g2KmY',
  },
  {
    id: '7',
    account: 'edelarandreazza',
    type: 'BUY',
    suai: '1000',
    aida: '64816',
    date: '1 months ago',
    transactionId: '2F5WTM',
  },
  {
    id: '8',
    account: '0x46ef43',
    type: 'BUY',
    suai: '4933',
    aida: '320048',
    date: '1 months ago',
    transactionId: 'HFKy5n',
  },
  {
    id: '9',
    account: '0xeff654',
    type: 'BUY',
    suai: '80632',
    aida: '5304379',
    date: '1 months ago',
    transactionId: 'DVxRX9',
  },
  {
    id: '10',
    account: '0x77939b',
    type: 'SALE',
    suai: '11397',
    aida: '773606',
    date: '1 months ago',
    transactionId: 'F1spna',
  },
];

const TradeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(23);

  const AccountCell = ({ account }) => (
    <div className='flex items-center space-x-2'>
      <div className='w-6 h-6'>
        <svg viewBox='0 0 24 24' className='w-full h-full text-blue-500'>
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
      <span className='font-mono text-blue-400'>{account}</span>
    </div>
  );

  return (
    <div className='bg-[#222222] text-white rounded-lg'>
      <table className='w-full'>
        <thead>
          <tr className='text-gray-400 border-b border-gray-800'>
            <th className='py-4 font-medium text-left'>ACCOUNT</th>
            <th className='py-4 font-medium text-left'>TYPE</th>
            <th className='py-4 font-medium text-left'>SUAI</th>
            <th className='py-4 font-medium text-left'>AIDA</th>
            <th className='py-4 font-medium text-left'>DATE</th>
            <th className='py-4 font-medium text-right'>TRANSACTION</th>
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS_DATA.map((tx) => (
            <tr
              key={tx.id}
              className='border-b border-gray-800/50 hover:bg-gray-800/20'
            >
              <td className='py-4'>
                <AccountCell account={tx.account} />
              </td>
              <td
                className={`py-4 ${
                  tx.type === 'BUY' ? 'text-cyan-400' : 'text-red-400'
                }`}
              >
                {tx.type}
              </td>
              <td className='py-4 font-mono'>{tx.suai.toLocaleString()}</td>
              <td className='py-4 font-mono'>{tx.aida.toLocaleString()}</td>
              <td className='py-4 text-gray-400'>{tx.date}</td>
              <td className='py-4 font-mono text-right text-gray-400'>
                {tx.transactionId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center justify-center my-6'>
        <div className='flex items-center space-x-4'>
          <button className='p-2 text-gray-400 hover:text-white'>
            <ChevronsLeft size={20} />
          </button>
          <button className='p-2 text-gray-400 hover:text-white'>
            <ChevronLeft size={20} />
          </button>
          <span className='text-gray-400'>
            {currentPage} / {totalPages}
          </span>
          <button className='p-2 text-gray-400 hover:text-white'>
            <ChevronRight size={20} />
          </button>
          <button className='p-2 text-gray-400 hover:text-white'>
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeTable;
