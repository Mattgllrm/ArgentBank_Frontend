import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Appel API pour se log
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        credentials
      );
      return response.data.body.token; // Le token envoyé par le back
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Champs incorrects");
    }
  }
);

//  Appel API pour récup info profil utilisateur
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
      console.log("Profile fetch response:", response.data); // debug
      return response.data.body;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Impossible d'accéder au profil");
    }
  }
);

//  Appel API pour MAJ username
export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async ({ token, userName }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Erreur lors de la mise à jour du username");
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
    },
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

      // FETCH PROFILE
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE USERNAME
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
