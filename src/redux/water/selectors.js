export const selectWaterDailyRecord = (state) => state.water.waterDaily.data;

export const selectDailyIsLoading = (state) => state.water.waterDaily.isLoading;
export const selectDailyErrorMessage = (state) =>
  state.water.waterDaily.errorMessage;
export const selectDailySuccessMessage = (state) =>
  state.water.waterDaily.successMessage;

export const selectWaterMonthlyRecord = (state) =>
  state.water.waterMonthly.data;
export const selectMonthlyIsLoading = (state) =>
  state.water.waterMonthly.isLoading;
export const selectMonthlyIsError = (state) => state.water.waterMonthly.isError;

export const selectWaterWeeklyData = (state) => state.water.waterWeekly.data;
