import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FuncDeleteDublicatesFromArrBy } from '../functions';
import { IModel, IIds, IProducts } from '../models/AsyncFetchModel';
import ProductsService from '../services/ProductsService';
const initialState: IModel = {
  products: {
    result: [],
  },
  fields: {
    product: [],
    brand: [],
    price: [],
  },
  pending: false,
  errors: null,
};

export const asyncGetProducts = createAsyncThunk(
  'products/post',
  async (credentials: { page: number }, thunkAPI) => {
    try {
      // получаем айди
      const jsonIds: IIds = await ProductsService.asyncFetchIds(credentials.page);
      // возвращаем уже результат из сервиса
      return await ProductsService.asyncFetchProducts(jsonIds, thunkAPI);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const asyncGetDataForFilter = createAsyncThunk(
  'products/post2',
  async (credentials: { filterBy: string; value: string | number }, thunkAPI) => {
    try {
      // получаем айдишники отталкиваясь от фильтров
      const jsonIds: IIds = await ProductsService.asyncFetchDataForFilter(
        credentials.filterBy,
        credentials.value,
        thunkAPI,
      );

      // возвращаем уже результат из сервиса
      return await ProductsService.asyncFetchProducts(jsonIds, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // products
      .addCase(asyncGetProducts.pending, (state) => {
        state.pending = true;
        state.errors = null;
      })
      .addCase(asyncGetProducts.fulfilled, (state, action: PayloadAction<IProducts>) => {
        // сюда заливается каждый уникальный продукт а затем уже по айди отслеживается
        const newArray: any = FuncDeleteDublicatesFromArrBy(action.payload.result, 'id');

        // обновление
        state.products = { result: newArray };
        state.errors = null;
        state.pending = false;
      })
      .addCase(asyncGetProducts.rejected, (state, action) => {
        state.pending = false;
        state.errors = action.error;
      })

      // search products
      .addCase(asyncGetDataForFilter.pending, (state) => {
        state.pending = true;
        state.errors = null;
      })
      .addCase(asyncGetDataForFilter.fulfilled, (state, action: PayloadAction<IProducts>) => {
        // сюда заливается каждый уникальный продукт а затем уже по айди отслеживается
        const newArray: any = FuncDeleteDublicatesFromArrBy(action.payload.result, 'id');

        // обновление
        state.products = { result: newArray };
        state.errors = null;
        state.pending = false;
      })
      .addCase(asyncGetDataForFilter.rejected, (state, action) => {
        state.pending = false;
        state.errors = action.error;
      });
  },
});

export default ProductsSlice.reducer;
