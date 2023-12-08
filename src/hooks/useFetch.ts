import { url } from "inspector";
import { useAuthContext } from "src/context/AuthProvider";

export const useFetch = (
  url: string,
  method: string,
  token: string,
  body?: any
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const raw = JSON.stringify(body);
  const requestOptions: RequestInit = body
    ? {
        method: method,
        headers: headers,
        body: raw,
        redirect: "follow",
      }
    : {
        method: method,
        headers: headers,
      };

  console.log(requestOptions);

  const promise = new Promise((resolve, reject) => {
    fetch(url, requestOptions)
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });

  // Return the promise
  return promise;
};
