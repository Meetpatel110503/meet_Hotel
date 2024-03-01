import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data
      )
      console.log(response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: "",
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        localStorage.setItem("currentUser", JSON.stringify(action.payload))
        state.currentUser = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
