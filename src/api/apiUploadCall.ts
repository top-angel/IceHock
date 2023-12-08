// General api to access data
import axios from "axios";

export const API_URI = "https://crab.icehockey.dataunion.app";

export default async function apiUploadCall(
  path: string = "",
  data: any = null,
  method: any = "GET",
  token: string = ""
) {
  let url = path;

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  return axios
    .request({
      url,
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      [dataOrParams]: data,
    })
    .then((resp) => {
      return resp;
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
      throw error.response.data;
    });
}
