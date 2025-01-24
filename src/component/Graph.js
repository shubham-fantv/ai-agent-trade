import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { FANTV_API_URL } from '@/src/constant/constants';

const Graph = ({ agentDetail }) => {
  const [noData, setNoData] = useState(false);
  const [candlestickData, setCandlestickData] = useState([]);
  const chartContainerRef = useRef();
  const tooltipRef = useRef(null);

  const fetchGraphData = async () => {
    const response = await fetch(
      `${FANTV_API_URL}/v1/trade/graph/${agentDetail?.ticker}?days=3`
    );
    const json = await response.json();
    const prices = json?.data?.price;
    const volumes = json?.data?.volume;

    if (!prices.length || !volumes.length) {
      setNoData(true);
      return;
    }

    if (!prices || !volumes) {
      setNoData(true);
      return;
    }

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

    for (const [interval, { prices, volumes }] of Object.entries(groupedData)) {
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

    setCandlestickData({ candles: formattedData, volumes: volumeData });
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

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
        height: 250,
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

      const toolTipWidth = 120;
      const toolTipHeight = 100;
      const toolTipMargin = 10;

      const toolTip = document.createElement('div');
      toolTip.style.position = 'absolute';
      toolTip.style.display = 'none';
      toolTip.style.padding = '8px';
      toolTip.style.boxSizing = 'border-box';
      toolTip.style.fontSize = '12px';
      toolTip.style.textAlign = 'left';
      toolTip.style.zIndex = '9999';
      toolTip.style.background = 'rgba(24, 24, 24, 0.95)';
      toolTip.style.color = 'white';
      toolTip.style.borderRadius = '4px';
      toolTip.style.fontFamily = 'monospace';
      toolTip.style.whiteSpace = 'pre';
      toolTip.style.pointerEvents = 'none';
      toolTip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      toolTip.style.width = 'auto';
      chartContainerRef.current.appendChild(toolTip);
      tooltipRef.current = toolTip;

      chart.subscribeCrosshairMove((param) => {
        if (
          !param ||
          !param.point ||
          !param.time ||
          !chartContainerRef.current
        ) {
          toolTip.style.display = 'none';
          return;
        }

        const { x: coordinateX, y: coordinateY } = param.point;

        if (
          coordinateX < 0 ||
          coordinateX > chartContainerRef.current.clientWidth ||
          coordinateY < 0 ||
          coordinateY > chartContainerRef.current.clientHeight
        ) {
          toolTip.style.display = 'none';
          return;
        }

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

        let left = coordinateX + toolTipMargin;
        if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
          left = coordinateX - toolTipMargin - toolTipWidth;
        }

        let top = coordinateY + toolTipMargin;
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
    <div className='bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6 h-[398px] mb-6 '>
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
          <div className='w-full h-[240px] flex items-center justify-center'>
            <p className='text-lg font-semibold'>No Data Available</p>
          </div>
        ) : (
          <div className='bg-[#222222] rounded-xl w-full h-100'>
            <div ref={chartContainerRef} className='w-full h-[240px]' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph;
