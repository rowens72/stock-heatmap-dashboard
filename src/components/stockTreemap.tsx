import React, { useEffect, useState } from 'react';
import { fetchStockData } from '../api/finnhub';
import { StockQuote } from '../types';
import Chart from 'react-apexcharts';

const symbols = ['NVDA', 'META', 'ANET', 'VOO', 'VUG', 'VOOG', 'VPU', 'HOOD', 'IWV', 'IVV', 'QQQ', 'PLTR', 'VTI', 'CGGR', 'CGDV'];

const StockTreemap: React.FC = () => {
  const [data, setData] = useState<StockQuote[]>([]);

  useEffect(() => {
    const getData = async () => {
      const stockData = await fetchStockData(symbols);
      setData(stockData);
    };
    getData();
  }, []);

  // Define color based on the percent change (dp)
  const getColor = (changePercent: number): string => {
    if (changePercent > 0) {
      return `rgba(0, 255, 0, ${Math.min(1, changePercent / 10)})`; // Green for positive
    } else {
      return `rgba(255, 0, 0, ${Math.min(1, Math.abs(changePercent) / 10)})`; // Red for negative
    }
  };

  // Prepare series data for the Treemap
  const series = [
    {
      data: data.map(stock => ({
        x: stock.symbol,
        y: stock.c,
        color: getColor(stock.dp)
      }))
    }
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'treemap',
      height: 500
    },
    title: {
      text: 'Stock Heatmap',
      align: 'center'
    },
    plotOptions: {
      treemap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { from: -100, to: 0, color: '#FF0000' }, // Red for negative changes
            { from: 0, to: 100, color: '#00FF00' }   // Green for positive changes
          ]
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000']
      },
      formatter: (value: string, opts: any) => {
        const { y } = opts?.w?.config?.series[0].data[opts?.dataPointIndex];
        return `${value}: $${y.toFixed(2)}`;
      }
    }
  };

  return (
    <div>
      <Chart options={options} series={series} type="treemap" height={500} />
    </div>
  );
};

export default StockTreemap;
