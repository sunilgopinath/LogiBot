// client/src/store/shipmentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShipmentData {
  id: string;
  status: string;
  location: string;
  eta: string;
}

interface AnalysisResult {
  analysis: string;
  weatherData: any;
  delayInfo: string;
  delayRisk: string;
}

interface ShipmentState {
  shipment: ShipmentData | null;
  analysisResult: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  shipment: null,
  analysisResult: null,
  loading: false,
  error: null
};

// Async thunk for fetching shipment data
export const fetchShipment = createAsyncThunk(
  'shipment/fetchShipment',
  async (shipmentId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/shipment/query', {
        query: `#${shipmentId}`
      });

      if (response.data.response.type === 'shipment') {
        return response.data.response.data;
      } else if (response.data.response.type === 'error') {
        return rejectWithValue(response.data.response.message);
      }
      return rejectWithValue('Unknown response format');
    } catch (error) {
      return rejectWithValue('Failed to fetch shipment data');
    }
  }
);

// Async thunk for analyzing shipment
export const analyzeShipment = createAsyncThunk(
  'shipment/analyzeShipment',
  async (shipmentData: ShipmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/ai/analyze-shipment', {
        shipmentData
      });

      if (response.data.success) {
        return response.data;
      }
      return rejectWithValue('Analysis failed');
    } catch (error) {
      return rejectWithValue('Failed to analyze shipment');
    }
  }
);

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    clearShipmentData: (state) => {
      state.shipment = null;
      state.analysisResult = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch shipment cases
      .addCase(fetchShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipment.fulfilled, (state, action: PayloadAction<ShipmentData>) => {
        state.shipment = action.payload;
        state.loading = false;
      })
      .addCase(fetchShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Analyze shipment cases
      .addCase(analyzeShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeShipment.fulfilled, (state, action) => {
        state.analysisResult = action.payload;
        state.loading = false;
      })
      .addCase(analyzeShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearShipmentData } = shipmentSlice.actions;
export default shipmentSlice.reducer;