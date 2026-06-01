import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRODUCTS_URL } from '../../constants';

export const listProducts = createAsyncThunk(
	'products/list',
	async (keyword = '') => {
		const { data } = await axios.get(`${PRODUCTS_URL}/?keyword=${keyword}`);
		return data;
	},
);

export const listProductDetails = createAsyncThunk(
	'products/details',
	async (id) => {
		const { data } = await axios.get(`${PRODUCTS_URL}/${id}/`);
		return data;
	},
);

const productSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		product: {},
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(listProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(listProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(listProductDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(listProductDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload;
			})
			.addCase(listProductDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default productSlice.reducer;
