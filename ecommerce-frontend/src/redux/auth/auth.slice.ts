import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IToken, IUserId, IUserResponse } from './auth.types';

interface AuthState {
  token: string;
  userId: number;
  user: IUserResponse | null;
}

const initialState: AuthState = {
  token: '',
  userId: 0,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    setAuthToken: (state: AuthState, action: PayloadAction<IToken>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    setAuthUserId: (state: AuthState, action: PayloadAction<IUserId>) => {
      state.userId = action.payload.userId;
      localStorage.setItem('userId', action.payload.userId.toString());
    },
    setUser: (state: AuthState, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload.data));
    },
    logout: (state: AuthState) => {
      state.token = '';
      state.userId = 0;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setAuthToken, setAuthUserId, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useAuthTokenSelector = () => useTypedSelector((state: RootState) => state.auth.token);
export const useAuthUserIdSelector = () =>
  useTypedSelector((state: RootState) => state.auth.userId);
export const useAuthUserSelector = () => useTypedSelector((state: RootState) => state.auth.user);
