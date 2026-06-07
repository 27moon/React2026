import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../utils/countries';

type CountriesState = {
  list: string[];
};

const initialState: CountriesState = {
  list: countryList,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;
