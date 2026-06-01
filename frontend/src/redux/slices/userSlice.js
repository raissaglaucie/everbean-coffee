import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERS_URL } from '../../constants';

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${USERS_URL}/login/`, {
				username: email,
				password,
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const register = createAsyncThunk(
	'user/register',
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${USERS_URL}/register/`, {
				name,
				email,
				password,
			});
			localStorage.setItem('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null,
		loading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.userInfo = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
