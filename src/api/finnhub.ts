import axios from 'axios';
import { StockQuote } from '../types';

const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockData = async (symbols: string[]): Promise<StockQuote[]> => {
  try {
    const responses = await Promise.all(
      symbols.map(symbol =>
        axios.get(`${BASE_URL}/quote`, {
          params: { symbol, token: API_KEY }
        })
      )
    );
    return responses.map((res, index) => ({
      symbol: symbols[index],
      ...res.data
    })) as StockQuote[];
  } catch (error) {
    console.error("Error fetching stock data", error);
    return [];
  }
};
