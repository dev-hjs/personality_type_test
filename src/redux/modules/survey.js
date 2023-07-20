import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  survey: [],
  isLoading: false,
  isError: false,
  error: null
};

export const __addSurvey = createAsyncThunk('survey/addSurvey', async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/data`, payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const surveySlice = createSlice({
  name: 'survey',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__addSurvey.pending]: (state, action) => {
      state.isLoading = true; // 네트워크 요청 시작
    },
    [__addSurvey.fulfilled]: (state, action) => {
      // response.data -> action.payload
      state.isLoading = false;
      state.survey = [...state.survey, action.payload];
    },
    [__addSurvey.rejected]: (state, action) => {
      // error => action.payload
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export default surveySlice.reducer;
