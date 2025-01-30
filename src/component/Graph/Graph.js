/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createChart } from 'lightweight-charts';
import { FANTV_API_URL } from '@/src/constant/constants';
// import DexScreenerEmbed from './AdvanceGraph';

const POLLING_INTERVAL = 2000; // 2 seconds in milliseconds

const Graph = ({ agentDetail, setGraphData }) => {
  const [noData, setNoData] = useState(false);
  const [candlestickData, setCandlestickData] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const chartContainerRef = useRef();
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  const pollingRef = useRef(null);

  // Initial data fetch without timestamp
  const fetchInitialData = async () => {
    try {
      const response = await fetch(
        `${FANTV_API_URL}/v1/trade/graph/${agentDetail?.ticker}`
      );
      const json = await response.json();
      const prices = json?.data?.price;
      const volumes = json?.data?.volume;

      setGraphData({
        bondingCurve: json?.data?.bondingCurveTxt,
        poolCoin: json?.data?.poolCoin,
        poolSui: json?.data?.poolSui,
      });
      if (!prices?.length || !volumes?.length) {
        setNoData(true);
        return;
      }

      const processedData = processGraphData(prices, volumes);
      setCandlestickData(processedData);

      // Set the last timestamp for subsequent polling
      const lastDataPoint = prices[prices.length - 1];
      setLastTimestamp(lastDataPoint[0]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setNoData(true);
    }
  };

  // Fetch new data with timestamp for polling
  // Modify the fetchNewData function
  const fetchNewData = async () => {
    if (!lastTimestamp) return;

    try {
      const response = await fetch(
        `${FANTV_API_URL}/v1/trade/graph/${agentDetail?.ticker}?timestampSec=${POLLING_INTERVAL}`
      );
      const json = await response.json();
      const prices = json?.data?.price;
      const volumes = json?.data?.volume;

      if (!prices?.length || !volumes?.length) return;

      // Process new data
      const processedData = processGraphData(prices, volumes);

      // Check for existing data and filter out duplicates
      setCandlestickData((prevData) => {
        // Create a map of existing times for quick lookup
        const existingTimes = new Set(prevData.candles.map((c) => c.time));

        // Filter out any new candles that already exist
        const newCandles = processedData.candles.filter(
          (candle) => !existingTimes.has(candle.time)
        );
        const newVolumes = processedData.volumes.filter(
          (volume) => !existingTimes.has(volume.time)
        );

        // If no new data, return previous state unchanged
        if (newCandles.length === 0) {
          return prevData;
        }

        // Sort all data by time to ensure ascending order
        const allCandles = [...prevData.candles, ...newCandles].sort(
          (a, b) => a.time - b.time
        );
        const allVolumes = [...prevData.volumes, ...newVolumes].sort(
          (a, b) => a.time - b.time
        );

        return {
          candles: allCandles,
          volumes: allVolumes,
        };
      });

      // Update chart if it exists and there's new data
      if (chartRef.current) {
        const { candleSeries, volumeSeries } = chartRef.current;

        // Update only the latest candle if it exists
        const latestCandle =
          processedData.candles[processedData.candles.length - 1];
        if (latestCandle) {
          candleSeries.update(latestCandle);
        }

        // Update only the latest volume if it exists
        const latestVolume =
          processedData.volumes[processedData.volumes.length - 1];
        if (latestVolume) {
          volumeSeries.update(latestVolume);
        }
      }

      // Update last timestamp only if we have new data
      const lastDataPoint = prices[prices.length - 1];
      if (lastDataPoint && lastDataPoint[0] > lastTimestamp) {
        setLastTimestamp(lastDataPoint[0]);
      }
    } catch (error) {
      console.error('Error fetching new data:', error);
    }
  };

  // Modify the processGraphData function to ensure time ordering
  const processGraphData = (prices, volumes) => {
    // Sort prices by timestamp first
    prices.sort((a, b) => a[0] - b[0]);

    const groupedData = prices.reduce((acc, [timestamp, price], idx) => {
      const date = new Date(timestamp);
      const roundedMinutes = Math.floor(date.getMinutes() / 0.5) * 0.5;
      const roundedDate = new Date(date);
      roundedDate.setMinutes(roundedMinutes, 0, 0);
      const intervalKey = roundedDate.getTime();

      if (!acc[intervalKey]) {
        acc[intervalKey] = { prices: [], volumes: 0 };
      }
      acc[intervalKey].prices.push(price);
      acc[intervalKey].volumes += volumes[idx]?.[1] || 0;
      return acc;
    }, {});

    const formattedData = [];
    const volumeData = [];

    // Ensure sorted processing of intervals
    const sortedIntervals = Object.entries(groupedData).sort(
      (a, b) => Number(a[0]) - Number(b[0])
    );

    for (const [interval, { prices, volumes }] of sortedIntervals) {
      const open = prices[0];
      const high = Math.max(...prices);
      const low = Math.min(...prices);
      const close = prices[prices.length - 1];
      const time = Number(interval) / 1000;

      formattedData.push({
        time,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        volume: volumes,
      });

      volumeData.push({
        time,
        value: volumes,
        color:
          parseFloat(close) >= parseFloat(open)
            ? 'rgba(38, 194, 129, 0.3)'
            : 'rgba(237, 28, 36, 0.3)',
      });
    }

    return {
      candles: formattedData,
      volumes: volumeData,
    };
  };

  // Initial data fetch
  useEffect(() => {
    fetchInitialData();

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [agentDetail]);

  // Set up polling after initial data is fetched
  useEffect(() => {
    if (lastTimestamp) {
      pollingRef.current = setInterval(fetchNewData, POLLING_INTERVAL);

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      };
    }
  }, [lastTimestamp]);

  // Chart initialization and update effect
  useEffect(() => {
    if (chartContainerRef.current && candlestickData.candles?.length > 0) {
      const prices = candlestickData.candles.flatMap((d) => [
        d.open,
        d.high,
        d.low,
        d.close,
      ]);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceRange = maxPrice - minPrice;

      const formatPrice = (price) => {
        return price.toFixed(9).replace(/\.?0+$/, '');
      };

      chartContainerRef.current.style.position = 'relative';

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: 'solid', color: '#1A1A1A' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
          horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
        },
        timeScale: {
          borderColor: '#2a2e39',
          timeVisible: true,
          secondsVisible: false,
          fixLeftEdge: false,
          fixRightEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          rightOffset: 0,
          barSpacing: 30,
          minBarSpacing: 10,
          tickMarkFormatter: (time) => {
            const date = new Date(time * 1000);
            return date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
          },
        },
        rightPriceScale: {
          borderColor: '#2a2e39',
          visible: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.2,
          },
          autoScale: false,
          mode: 1,
          entireTextOnly: true,
          minValue: minPrice - priceRange * 0.1,
          maxValue: maxPrice + priceRange * 0.1,
          tickMarkFormatter: formatPrice,
        },
        crosshair: {
          mode: 'magnet',
          vertLine: {
            width: 1,
            color: '#758696',
            style: 0,
          },
          horzLine: {
            width: 1,
            color: '#758696',
            style: 0,
          },
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26C281',
        downColor: '#ED1C24',
        borderUpColor: '#26C281',
        borderDownColor: '#ED1C24',
        wickUpColor: '#26C281',
        wickDownColor: '#ED1C24',
        priceFormat: {
          type: 'price',
          precision: 9,
          minMove: 0.000000001,
        },
      });

      const volumeSeries = chart.addHistogramSeries({
        color: 'rgba(38, 166, 154, 0.3)',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'volume',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      // Store chart and series references for updates
      chartRef.current = {
        chart,
        candleSeries: candlestickSeries,
        volumeSeries: volumeSeries,
      };

      chart.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
        visible: true,
        position: 'left',
        borderColor: '#2a2e39',
        textColor: '#d1d4dc',
        borderVisible: true,
        drawTicks: true,
        autoScale: true,
      });

      candlestickSeries.setData(candlestickData.candles);
      volumeSeries.setData(candlestickData.volumes);

      const timeScale = chart.timeScale();
      timeScale.applyOptions({
        rightOffset: 0,
        barSpacing: 30,
      });
      timeScale.fitContent();

      // Tooltip setup
      const setupTooltip = () => {
        const toolTip = document.createElement('div');
        Object.assign(toolTip.style, {
          position: 'absolute',
          display: 'none',
          padding: '8px',
          boxSizing: 'border-box',
          fontSize: '12px',
          textAlign: 'left',
          zIndex: '9999',
          background: 'rgba(24, 24, 24, 0.95)',
          color: 'white',
          borderRadius: '4px',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          pointerEvents: 'none',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: 'auto',
        });

        chartContainerRef.current.appendChild(toolTip);
        tooltipRef.current = toolTip;

        return toolTip;
      };

      const toolTip = setupTooltip();

      chart.subscribeCrosshairMove((param) => {
        if (!param?.point || !param?.time || !chartContainerRef.current) {
          toolTip.style.display = 'none';
          return;
        }

        const { x: coordinateX, y: coordinateY } = param.point;
        const data = candlestickData.candles.find((d) => d.time === param.time);
        const volume = candlestickData.volumes.find(
          (d) => d.time === param.time
        );

        if (!data || !volume) {
          toolTip.style.display = 'none';
          return;
        }

        toolTip.style.display = 'block';
        toolTip.innerHTML = `
O: ${formatPrice(data.open)}
H: ${formatPrice(data.high)}
L: ${formatPrice(data.low)}
C: ${formatPrice(data.close)}
V: ${volume.value.toFixed(2)}`;

        const toolTipWidth = 120;
        const toolTipHeight = 100;
        const toolTipMargin = 10;

        let left = coordinateX + toolTipMargin;
        let top = coordinateY + toolTipMargin;

        if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
          left = coordinateX - toolTipMargin - toolTipWidth;
        }

        if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
          top = coordinateY - toolTipHeight - toolTipMargin;
        }

        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      });

      const handleResize = () => {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
        if (tooltipRef.current) {
          tooltipRef.current.remove();
        }
      };
    }
  }, [candlestickData]);

  return (
    <div className='bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6 h-[530px] mb-6 relative'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>
            {agentDetail?.ticker} Price Chart
          </h3>
          {!noData && (
            <p className='text-sm text-gray-400'>24h Trading Activity</p>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center mt-4 text-gray-500'>
        {noData ? (
          <div className='w-full h-[400px] flex items-center justify-center'>
            <p className='text-lg font-semibold'>No Data Available</p>
          </div>
        ) : (
          <div className='bg-[#222222] rounded-xl w-full h-[400px]'>
            <div ref={chartContainerRef} className='w-full h-[400px]' />
            {/* <DexScreenerEmbed pairAddress={agentDetail?.tickerId} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
