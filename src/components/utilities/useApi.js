import React from 'react';
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/api/"
const refreshUrl = "/user/token/refresh/";

export const tokens = {
    ACCESS: 'access-token',
    REFRESH: 'refresh-token',
}

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': `JWT ${localStorage.getItem(tokens.ACCESS)}`,
        'Content-Type': 'application/json',
    }
});

const logout = () => {
    localStorage.clear();
    window.location.href = "/login/";
  }
  
  /* Documentation for Axios Interceptors: https://github.com/axios/axios#interceptors
  * If this interceptor encountered a 401 Unauthorized Error, this might imply that the access token expired.
  * If the access token expired, the intercept attempts to refresh the access token with the refresh token.
  * After that, it retries the original request that was rejected because of the 401 Unauthorized Error.
  * Example:
    # Step 1: 401 Unauthorized Error
    [28/Nov/2020 21:35:05] "GET /stock/standing-detail/ HTTP/1.1" 401 183
    # Step 2: Request for new access token using the current refresh token
    # Step 3: Replace the old access token with the new access token in localStorage
    [28/Nov/2020 21:35:05] "POST /api/token/refresh/ HTTP/1.1" 200 438
    # Step 4: Retry original request with the new access token
    [28/Nov/2020 21:35:05] "GET /stock/standing-detail/ HTTP/1.1" 200 117 -> 
  */
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
  
      // Prevent infinite loop
      if (error.response.status === 401 && originalRequest.url === refreshUrl) {
        console.log("Stop infinite loop in Axios interceptor.")
        logout();
        return Promise.reject(error);
      }
  
      // Request for new access token using the current refresh token
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
        const refreshToken = localStorage.getItem(tokens.REFRESH);
        if (refreshToken) {
          const jwtPayload = JSON.parse(atob(refreshToken.split(".")[1]));
          const now = Math.ceil(Date.now() / 1000);
          if (jwtPayload.exp > now) {
            return axiosInstance
              .post(refreshUrl, {refresh: refreshToken})
              .then((response) => {
                localStorage.setItem(tokens.ACCESS, response.data.access);
                axiosInstance.defaults.headers['Authorization'] = `JWT ${response.data.access}`;
                originalRequest.headers['Authorization'] = `JWT ${response.data.access}`;
                return axiosInstance(originalRequest);
              })
              .catch(err => {
                  console.log(err);
              });
          } else {
            console.log("Refresh token is expired", jwtPayload.exp, now);
            logout();
          }
        } else {
            console.log("Refresh token not available.");
            logout();
        }
      }
      return Promise.reject(error);
    }
  );
  
  export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };

export function getApi(url){
    //console.log('getting stuff')
    return async () => {
      console.log('getting stuff')
      const data = await axiosInstance.get(url) 
      return data
    }
  }