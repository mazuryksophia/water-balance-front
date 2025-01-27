export const selectIsLoading = (state) => state.auth.isLoading;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user.name;
export const selectUserEmail = (state) => state.auth.user.email;
export const selectUserPhoto = (state) => state.auth.user.photo;
export const selectUserAccess = (state) => state.auth.user.access;

export const selectWaterRate = (state) => state.auth.user.dailyWaterConsumption;

export const selectIsLoadingPhoto = (state) => state.auth.isLoadingPhoto;

export const selectAuthErrorMessage = (state) => state.auth.errorMessage;
export const selectAuthSuccessMessage = (state) => state.auth.successMessage;

export const selectIsAuthenticated = (state) => {
  const token = selectToken(state);
  const isLoggedIn = selectIsLoggedIn(state);
  return !!token && isLoggedIn;
};
