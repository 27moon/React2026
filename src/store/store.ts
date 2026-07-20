import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import { FormDataSliceReducer } from './formDataSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formData: FormDataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
