import {
  call,
  put,
  delay,
  all,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { userActions } from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks/useFetch";

import { API_URI } from "src/api/auth";
import Router from "next/router";
import apiUploadCall from "../../api/apiUploadCall";
import { aquariusApiCall } from "../../api/apiCall";

// import type { AppState } from "../store";
// import { selects } from "../hooks";

export function* userAllMembersHandler(
  action: PayloadAction<{
    results: number;
    url: string;
  }>
): Generator<any, any, any> {
  console.warn("allMembers", action);

  try {
    const url = action.payload.url;
    const data = yield call(useFetch, url, "GET", "");
    yield put(userActions.setAllMembers(data.results));
  } catch (err) {
  } finally {
  }
}

export function* userUserNameHandler(
  action: PayloadAction<{
    public_address: string;
    username: string;
  }>
): Generator<any, any, any> {
  console.warn("username", action);

  try {
    const url = `${API_URI}/update_username`;
    const data = yield call(useFetch, url, "POST", "", action.payload);
    console.log(data);
    yield put(userActions.setUserName(data.username));
    // yield call([Router, "push"], `/onboarding/tutorial`);
  } catch (err) {
  } finally {
  }
}

export function* uploadTrainingFile(
  action: PayloadAction<{
    file: any;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("uploadTraningFile", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/api/v1/training/upload-csv`;

    console.log(url);

    const data = new FormData();
    const filepath = action.payload.file.name;
    data.append("file", action.payload.file, filepath);

    const results = yield call(
      apiUploadCall,
      url,
      data,
      "POST",
      action.payload.token
    );
    console.log(results.data);
    yield put(userActions.setUploadTraningFile(results.data.id));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getCSVFilesByUser(
  action: PayloadAction<{
    page_no: number;
    per_page: number;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getCSVFilesByUser", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/api/v1/training/get-csv-by-user?page_no=${action.payload.page_no}&per_page=${action.payload.per_page}`;
    const data = yield call(useFetch, url, "GET", action.payload.token);
    yield put(userActions.setFileList(data.csv));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    yield put(userActions.setDataLoading(false));

    console.log(err);
  } finally {
  }
}

export function* getStatisticsData(
  action: PayloadAction<{
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getStatisticsData", action);

  try {
    yield put(userActions.setDataLoading(true));

    const url = `${API_URI}/api/v1/training/get-statistics-icehockey-data`;
    const { result } = yield call(useFetch, url, "GET", action.payload.token);
    console.log(result);
    yield put(userActions.setStatisticsData(result));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    yield put(userActions.setDataLoading(false));

    console.log(err);
  } finally {
  }
}

export function* deleteFile(
  action: PayloadAction<{
    id: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getStatisticsData", action);

  try {
    const url = `${API_URI}/api/v1/training/delete-csv/${action.payload.id}`;
    const { result } = yield call(
      useFetch,
      url,
      "DELETE",
      action.payload.token
    );
    yield put(userActions.setDeleteFile(action.payload.id));
  } catch (err) {
    console.log(err);
  } finally {
  }
}

export function* uploadProfilePicture(
  action: PayloadAction<{
    file: any;
    address: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("uploadProfilePicture", action);

  try {
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}/set_profile_image`;

    console.log(url);

    const data = new FormData();
    const filepath = action.payload.file.name;
    data.append("user_id", action.payload.address);
    data.append("file", action.payload.file, filepath);
    console.log(data);

    const results = yield call(
      apiUploadCall,
      url,
      data,
      "POST",
      action.payload.token
    );
    console.log(results.data);
    // yield put(userActions.setUploadTraningFile(results.data.id));
    yield put(
      userActions.setProfilePicture(
        `${API_URI}/get_profile_image/${action.payload.address}`
      )
    );
    yield put(userActions.setDataLoading(false));
    yield call([Router, "push"], `/onboarding/tutorial`);
  } catch (err) {
    console.log("error===>", err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export default function* userWalletSaga() {
  yield all([
    takeEvery(userActions.allMembers.type, userAllMembersHandler),
    takeEvery(userActions.username.type, userUserNameHandler),
    takeLatest(userActions.uploadTraningFile, uploadTrainingFile),
    takeLatest(userActions.getCSVFilesByUser, getCSVFilesByUser),
    takeLatest(userActions.getStatisticsData, getStatisticsData),
    takeLatest(userActions.deleteFile, deleteFile),
    takeLatest(userActions.uploadProfilePicture, uploadProfilePicture),
  ]);
  delay(1000);
}
