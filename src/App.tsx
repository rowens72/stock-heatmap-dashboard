import React from 'react';
import './App.css';
import StockTreemap from './components/stockTreemap';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Stock Heatmap Dashboard</h1>
      <StockTreemap />
    </div>
  );
};

export default App;
