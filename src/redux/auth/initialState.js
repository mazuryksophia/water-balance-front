export const INITIAL_STATE = {
  user: {
    name: '',
    email: null,
    gender: null,
    photo: null,
    access: null,
    weight: 0,
    dailyActiveTime: 0,
    dailyWaterConsumption: 0,
  },

  isLoading: null,
  isLoadingPhoto: null,
  token: null,
  isLoggedIn: false,
  isNewUser: false,
  errorMessage: null,
  successMessage: null,
};
