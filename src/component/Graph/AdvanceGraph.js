import React from 'react';

const DexScreenerEmbed = ({
  pairAddress = '0xB9a573f1d363707741c6B30326FA794F0134440e',
  chain = 'sui',
}) => {
  return (
    <>
      <style jsx global>{`
        #dexscreener-embed {
          position: relative;
          width: 100%;
          padding-bottom: 125%;
        }

        @media (min-width: 1400px) {
          #dexscreener-embed {
            padding-bottom: 65%;
          }
        }

        #dexscreener-embed iframe {
          position: absolute;
          width: 100%;
          height: 80%;
          top: 0;
          left: 0;
          border: 0;
        }
      `}</style>

      <div id='dexscreener-embed'>
        <iframe
          src={`https://dexscreener.com/${chain}/${pairAddress}?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTimeframesToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15`}
          title='DEX Screener'
        />
      </div>
    </>
  );
};

export default DexScreenerEmbed;
