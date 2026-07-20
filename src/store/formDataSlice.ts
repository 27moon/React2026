import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSubmission } from '../types/types';
import type { RootState } from './store';

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
    saveFormData: {
      reducer: (state, action: PayloadAction<FormSubmission>) => {
        state.data.push(action.payload);
      },
      prepare: (payload: Omit<FormSubmission, 'id'>) => {
        return {
          payload: {
            ...payload,
            id: crypto.randomUUID(),
          } as FormSubmission,
        };
      },
    },
  },
});

export const { saveFormData } = FormDataSlice.actions;

export const FormDataSliceReducer = FormDataSlice.reducer;

export const selectSubmissions = (state: RootState) => state.formData.data;
