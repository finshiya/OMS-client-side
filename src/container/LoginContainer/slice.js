import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: {},
    loading: false,
    error: null
},
  reducers: {
    login: (state,action) => {
      console.log(action.payload);
      
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
    loginUser: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
      },
      loginUserFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

  }
});

export const {
  login,
  loginSuccess,
  loginFail,
  loginUser,
  loginUserSuccess,
  loginUserFail
 
} = loginSlice.actions;
export const selectError = (state) => state.login.error;
export default loginSlice.reducer;
