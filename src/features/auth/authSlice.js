import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data?.message || "Login failed");

      return data.body.token;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data?.message || "Profile failed");

      return data.body;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const updateUserName = createAsyncThunk(
  "auth/updateUserName",
  async (userName, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await res.json();

      if (!res.ok) return rejectWithValue(data?.message || "Update failed");

      return data.body;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.isLoading = false;
        s.token = a.payload;
      })
      .addCase(login.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Login failed";
      })

      // FETCH PROFILE
      .addCase(fetchProfile.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchProfile.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
      })
      .addCase(fetchProfile.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Profile failed";
      })

      // UPDATE USERNAME
      .addCase(updateUserName.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(updateUserName.fulfilled, (s, a) => {
        s.isLoading = false;
        if (s.user) {
          s.user.userName = a.meta.arg;
        }
      })
      .addCase(updateUserName.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Update failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;