import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  prices: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

export const fetchInitialPrices = createAsyncThunk('prices/fetchInitialPrices', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/standardollars');
  return response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
});

export const fetchPricesByDateRange = createAsyncThunk('prices/fetchPricesByDateRange', async (dates) => {
  const response = await axios.get('http://127.0.0.1:8000/api/dollars', { params: { start_date: dates.startDate, end_date: dates.endDate } });
  return response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
});

let nextId = 1;

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { date, price } = action.payload;
      const index = state.prices.findIndex((p) => p.date === date);
      if (index !== -1) {
        state.prices[index].price = price;
      }
    },
    addPrice: (state, action) => {
      state.prices.push(action.payload);
      state.prices.sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordenar por fecha
    },
    deletePrice: (state, action) => {
      const id = action.payload;
      state.prices = state.prices.filter((price) => price.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload.map((price) => ({ ...price, id: nextId++ }));
      })
      .addCase(fetchInitialPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPricesByDateRange.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPricesByDateRange.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.prices = action.payload.map((price) => ({ ...price, id: nextId++ }));
      })
      .addCase(fetchPricesByDateRange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updatePrice, addPrice, deletePrice } = pricesSlice.actions;
export default pricesSlice.reducer;