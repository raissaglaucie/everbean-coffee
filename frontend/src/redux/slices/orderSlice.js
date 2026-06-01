import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ORDERS_URL } from '../../constants';

export const createOrder = createAsyncThunk(
	'order/create',
	async (order, { getState, rejectWithValue }) => {
		try {
			const {
				user: { userInfo },
			} = getState();
			const { data } = await axios.post(`${ORDERS_URL}/`, order, {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		order: {},
		loading: false,
		error: null,
		success: false,
	},
	reducers: {
		resetOrder: (state) => {
			state.success = false;
			state.order = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.order = action.payload;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
