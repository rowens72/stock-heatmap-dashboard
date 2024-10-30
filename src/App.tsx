import React from 'react';
import './App.css';
import StockHeatmap from './components/StockHeatmap';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Stock Heatmap Dashboard</h1>
      <StockHeatmap />
    </div>
  );
};

export default App;
