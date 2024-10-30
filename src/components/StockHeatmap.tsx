import React, { useEffect, useState } from 'react';
import { fetchStockData } from '../api/finnhub';
import { StockQuote } from '../types';
import { ResponsiveContainer, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const symbols = ['NVDA', 'META', 'ANET', 'VOO', 'VUG', 'VOOG', 'VPU', 'HOOD', 'IWV', 'IVV', 'QQQ', 'PLTR', 'VTI'];

const StockHeatmap: React.FC = () => {
  const [data, setData] = useState<StockQuote[]>([]);

  useEffect(() => {
    const getData = async () => {
      const stockData = await fetchStockData(symbols);
      setData(stockData);
    };
    getData();
  }, []);

  // Adjust color intensity based on the changePercent value
  const getColor = (changePercent: number): string => {
    if (changePercent > 0) {
      const greenIntensity = Math.min(255, Math.floor(changePercent * 25));
      return `rgb(0, ${greenIntensity}, 0)`;
    } else {
      const redIntensity = Math.min(255, Math.floor(Math.abs(changePercent) * 25));
      return `rgb(${redIntensity}, 0, 0)`;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <XAxis dataKey="symbol" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="c">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.dp)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StockHeatmap;
