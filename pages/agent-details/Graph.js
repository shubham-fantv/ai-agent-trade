import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Graph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch BTC candlestick data from an API
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
      );
      const json = await response.json();

      // Process prices to create candlestick data
      const prices = json.prices; // [timestamp, price]
      const candlestickData = [];

      // Group prices by day and calculate OHLC
      const groupedPrices = prices.reduce((acc, [timestamp, price]) => {
        const date = new Date(timestamp).toISOString().split("T")[0]; // Get only the date part
        if (!acc[date]) acc[date] = [];
        acc[date].push(price);
        return acc;
      }, {});

      // Transform grouped data into OHLC format
      for (const [date, prices] of Object.entries(groupedPrices)) {
        const open = prices[0];
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const close = prices[prices.length - 1];
        candlestickData.push({
          x: new Date(date),
          y: [open, high, low, close],
        });
      }

      setData(candlestickData);
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: "candlestick",
      height: 250,
    },
    title: {
      text: "BTC/USD Candlestick Chart",
      align: "center",
      color: "#FFF",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6 h-[300px] mb-6">
      <h3 className="text-xl font-bold mb-4">Graph</h3>
      <div className="text-gray-500 h-full flex items-center justify-center">
        <div className="w-full h-80">
          <Chart
            options={options}
            series={[{ data }]}
            type="candlestick"
            height="250"
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;
