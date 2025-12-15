import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Appel API pour se connecter
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", credentials);
      return response.data.body.token; // Le token envoyé par le backend
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Champs incorrects");
    }
  }
);

//  Appel API pour récup les infos profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Profile fetch response:", response.data); // pour debug
      return response.data.body;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Impossible d'acceder au profil");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.profile = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
