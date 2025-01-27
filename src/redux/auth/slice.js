import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './initialState';
import {
  registration,
  login,
  current,
  logOut,
  refreshToken,
  updateUserProfile,
  uploadUserPhoto,
  updateUserAccess,
} from './operations';
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOutReducer: () => {
      return INITIAL_STATE;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.token = null;
      })

      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isNewUser = true;
        state.successMessage = 'Успішно зареєстровано';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.successMessage = 'Успішно ввійшли';
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Невірний емейл або пароль ';
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, (_, action) => {
        return {
          ...INITIAL_STATE,
          errorMessage: action.payload || 'Помилка під час виходу',
        };
      })
      .addCase(current.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(current.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(current.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Щось пішло не так, повторіть спробу пізніше';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Профіль оновлено';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = 'Щось пішло не так, повторіть спробу пізніше';
      })
      .addCase(uploadUserPhoto.pending, (state) => {
        state.isLoadingPhoto = true;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isLoadingPhoto = false;
        state.successMessage = 'Фото оновлено';
        state.user.photo = action.payload;
      })
      .addCase(uploadUserPhoto.rejected, (state) => {
        state.isLoadingPhoto = false;
        state.errorMessage = 'Щось пішло не так, повторіть спробу пізніше';
      })
      .addCase(updateUserAccess.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAccess.fulfilled, (state, { payload }) => {
        const adminEmail = import.meta.env.VITE_API_ADMIN_EMAIL;
        state.isLoading = false;
        if (state.user.email === adminEmail) {
          state.user.access = true;
        } else {
          state.user.access = payload.access;
        }
      })
      .addCase(updateUserAccess.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = payload;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, () => INITIAL_STATE);
  },
});

export const authReducer = authSlice.reducer;
export const { setToken, logOutReducer, setLoggedIn, setUser } =
  authSlice.actions;
