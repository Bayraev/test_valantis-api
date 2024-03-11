import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import md5 from 'md5';
import { toYearMonthDay } from '../functions';
import { IAuth } from '../models/AuthModel';

const initialState: IAuth = {
  isAuth: false,
  pending: false,
  errors: null,
};

export const asyncAuth = createAsyncThunk(
  'auth/post',
  async (credentials: { password: string }, thunkAPI) => {
    try {
      // строки для генерации md5
      const currentDate: string = toYearMonthDay();
      const passForHash: string = `${credentials.password}_${currentDate}`;
      const hash = md5(passForHash);

      const bodyGetIds = {
        action: 'get_ids',
        params: { offset: 0, limit: 1 },
      };

      //* ДЕЛАЮ ЭТО ДЛЯ ПРОВЕРКИ ПРАВИЛЬНОСТИ ПАРОЛЯ, другого способа проверки нет!!
      const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth': `${hash}` },
        body: JSON.stringify(bodyGetIds),
      });

      const json = await res.json();
      localStorage.setItem('password', hash);

      if (json.error) {
        localStorage.removeItem('password');
        return thunkAPI.rejectWithValue(json.error);
      }

      return thunkAPI.fulfillWithValue(json);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncAuth.pending, (state) => {
        state.pending = true;
        state.isAuth = false;
        state.errors = null;
      })
      .addCase(asyncAuth.fulfilled, (state) => {
        state.pending = false;
        state.isAuth = true;
        state.errors = null;
      })
      .addCase(asyncAuth.rejected, (state, action) => {
        state.pending = false;
        state.isAuth = false;
        state.errors = action.error;
      });
  },
});

export default AuthSlice.reducer;
