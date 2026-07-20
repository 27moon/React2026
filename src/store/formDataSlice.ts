import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission } from '../types/types';

type FormDataState = {
  data: FormSubmission[];
};

const initialState: FormDataState = {
  data: [],
};

const FormDataSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormSubmission>) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveFormData } = FormDataSlice.actions;

export const FormDataSliceReducer = FormDataSlice.reducer;
