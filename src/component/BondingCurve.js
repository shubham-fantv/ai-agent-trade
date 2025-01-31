import React from 'react';

const BondingCurve = ({ graphData }) => {
  const calculatePercentage = () => {
    if (!graphData?.poolCoin || !graphData?.poolSui) return 50;

    const totalValue = Number(graphData.poolCoin);
    return (Number(graphData.poolSui) / totalValue) * 100;
  };

  const percentage = calculatePercentage();

  const renderBondingCurveText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className='p-6'>
      <h3 className='mb-4 text-xl font-bold'>Bonding Curve</h3>
      <div className='relative h-1 bg-[#333333] rounded-full overflow-hidden mb-4'>
        {/* Gradient background */}
        <div className='h-full w-[100%]' style={{ width: `${percentage}%` }} />

        {/* Pointer */}
        <div
          className='absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/0 rounded-full top-1/2'
          style={{ left: `${percentage}%` }}
        >
          {/* Glow effect */}
          <div className='absolute inset-0 rounded-full bg-white/20 blur-sm'></div>
        </div>
      </div>
      {(percentage * 100).toFixed(3)} %{/* Pool values */}
      {/* <div className='flex justify-between mt-2 text-xs text-gray-400'>
        <span>Pool SUI: {Number(graphData?.poolSui).toLocaleString()}</span>
        <span>Pool Coin: {Number(graphData?.poolCoin).toLocaleString()}</span>
      </div> */}
      <div className='mt-4 text-sm text-gray-400'>
        <p className='mb-2'>
          {renderBondingCurveText(graphData?.bondingCurve)}
        </p>
      </div>
    </div>
  );
};

export default BondingCurve;
