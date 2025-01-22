import React from 'react'

const BondingCurve = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">Bonding Curve</h3>
      <div className="h-1 bg-[#333333] rounded-full overflow-hidden mb-4">
        <div className="h-full w-[100%] bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/0"></div>
      </div>
      <div className="text-sm text-gray-400">
        <p className="mb-2">
          When the market cap reaches $7,500 $AI all the liquidity from the
          bonding curve will be deposited into Cellar and burned, progression
          increases as the price goes up.
        </p>
        <p>
          there is a 0 tokens still available for sale in the bonding curve and
          there is 5,000 $AI in the bonding curve
        </p>
      </div>
    </div>
  );
}

export default BondingCurve
