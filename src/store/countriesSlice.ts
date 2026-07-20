import { createSlice } from '@reduxjs/toolkit';
import { countryList } from '../utils/countries';
import type { RootState } from './store';

type CountriesState = {
  list: readonly string[];
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

export const selectCountriesList = (state: RootState) => state.countries.list;
