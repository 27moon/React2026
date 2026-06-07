import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FormData = {
  formType: 'uncontrolled' | 'rhf';
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  country: string;
  image: string;
};

type FormDataState = {
  data: FormData[];
};

const initialState: FormDataState = {
  data: [],
};

const FormDataSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { saveFormData } = FormDataSlice.actions;

export const FormDataSliceReducer = FormDataSlice.reducer;
