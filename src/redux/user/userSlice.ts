import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: any;
  members: [];
  isDataLoading: boolean;
  username: string;
  uploadTraningFile: any;
  statisticsData: any;
  fileList: any;
  pricture: any;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: { wallet: {} },
  members: [],
  isDataLoading: false,
  username: "",
  uploadTraningFile: {},
  statisticsData: {},
  fileList: [],
  pricture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.members = [];
      state.user = {};
      state.username = "";
      state.uploadTraningFile = {};
      state.statisticsData = {};
      state.fileList = [];
      state.pricture = "";
    },
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllMembers: (state, action: PayloadAction<any>) => {
      state.members = action.payload;
    },
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.pricture = action.payload;
    },
    setEmptyTraningFile: (state, action) => {
      state.uploadTraningFile = action.payload;
    },
    setUploadTraningFile: (state, action) => {
      state.fileList = [...state.fileList, action.payload];
      state.uploadTraningFile = action.payload;
    },
    setStatisticsData: (state, action) => {
      state.statisticsData = action.payload;
    },
    setFileList: (state, action) => {
      state.fileList = action.payload;
    },
    setDeleteFile: (state, action) => {
      state.fileList = state.fileList.filter(
        (item: any) => item._id !== action.payload
      );
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  allMembers: createAction<{ url: string }>("user/allMembers"),
  username: createAction<{ public_address: string; username: string }>(
    "user/username"
  ),
  uploadTraningFile: createAction<{ file: any; token: string }>(
    "user/uploadTraningFile"
  ),
  getCSVFilesByUser: createAction<{
    page_no: number;
    per_page: number;
    token: string;
  }>("user/getCSVFiles"),
  getStatisticsData: createAction<{ token: string }>("user/getStatisticsData"),
  deleteFile: createAction<{ id: string; token: string }>("user/deleteFile"),
  uploadProfilePicture: createAction<{
    file: any;
    address: string;
    token: string;
  }>("user/profilePicture"),
};

export default userSlice.reducer;
