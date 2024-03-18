import { createSlice } from '@reduxjs/toolkit'
import { fetchSearchResults } from '../api'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  results: [],
  selectedResult: null,
  loading: false,
  loaded: false,
  error: null,
}

export const fetchSearchResultsAsync = createAsyncThunk(
  'search/fetchSearchResultsAsync',
  async ({ term, signal }, { rejectWithValue }) => {
    try {
      if (!term) throw new Error('No search term')
      const results = await fetchSearchResults(term, signal)
      return results
    } catch (e) {
      return rejectWithValue(e.code === 'ERR_CANCELED' ? e.code : e.message)
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedResult: (state, action) => {
      state.selectedResult = action.payload
    },
    clearSelectedResult: (state) => {
      state.selectedResult = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResultsAsync.pending, (state) => {
        state.loading = true
        state.loaded = false
        state.error = false
      })
      .addCase(fetchSearchResultsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
        state.loaded = true
      })
      .addCase(fetchSearchResultsAsync.rejected, (state, action) => {
        if (action.payload !== 'ERR_CANCELED') {
          state.loading = false
          state.error = action.error.message
          state.results = []
          state.loaded = false
        }
      })
  },
})

export const { clearSelectedResult, setSelectedResult } = searchSlice.actions
export default searchSlice
