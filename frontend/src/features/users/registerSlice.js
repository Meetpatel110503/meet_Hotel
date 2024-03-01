import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const register = createAsyncThunk(
  "auth/register",
  async (Data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        Data
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: "",
    success: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = ""
        state.success = ""
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        state.success = "Registration successful."
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Registration failed. Please try again."
      })
  },
})

export default registerSlice.reducer
