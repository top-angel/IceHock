// General api to access data
import axios from "axios";

export async function apiCall(
  path = "",
  data: any = null,
  method: any = "GET",
  token: string = ""
) {
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  const url = path;

  console.log(url, data);

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
    .then((json) => json)
    .catch((error) => {
      console.log(error);
    });
}

export async function aquariusApiCall(
  path = "",
  data: any = null,
  method: any = "GET",
  token: string = ""
) {
  const url = path;
  let p = JSON.stringify({
    page_no: 1,
    per_page: 10,
  });
  console.log(url);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://crab.icehockey.dataunion.app/api/v1/training/get-csv-by-user",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTM1MTkwMywianRpIjoiOTQ4N2EyZDQtMTRhMi00YmYxLThmMTctYzMwMDc2ZTBlMDBlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjB4N2E1REZjZTlFZDk0NzAyRDc0ZTI1MGQ5QTJCNjM1YUM0RTdDZDUyMCIsIm5iZiI6MTY5OTM1MTkwMywiZXhwIjoxNzAwODUxOTAzLCJpc19hZG1pbiI6ZmFsc2UsInJvbGVzIjpbInVzZXIiXX0.6dOxrHJPCK2WmsKy_ksraFkvxVlc0lGCSIkmSW6l0UA",
    },
    data: p,
  };

  return axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  //  axios
  //   .request({
  //     url,
  //     method,
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...(token && { Authorization: `Bearer ${token}` }),
  //     },
  //     data: p,
  //   })
  //   .then((resp) => {
  //     return resp;
  //   })
  //   .then((json) => json)
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
