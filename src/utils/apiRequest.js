import { handleErrorResponse } from "./common";
import { AxiosInstance } from "./http";

export const makeUrl = (url) => {
  if (!url.includes("http")) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/" + url;
  } else {
    return url;
  }
};

export const makeFileURL = function (URL) {
  return URL;
};

export const getAPI = (url, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.get(makeUrl(url), {
        params,
      });
      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const postAPI = (url, formData, headerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: { ...headerData },
      });

      resolve(res.data);
    } catch (error) {
      reject(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const postFileAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const putFileAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const putAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {},
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const deleteAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.delete(makeUrl(url), {
        formData,
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};
