import axios from 'axios';



const apiClient = axios.create({

    baseURL: "http://localhost:5000/api",

    withCredentials: true, // 🔴 CRITICAL: Sends HttpOnly cookies to backend

    headers: {

        "Content-Type": "application/json",

    }

});



// Response Interceptor: Handles 401 Errors (Token Expiry)

apiClient.interceptors.response.use(

    (response) => {

        return response;

    },

    async (error) => {

        const originalRequest = error.config;



        // If error is 401 and we haven't retried yet

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true; // Mark as retried to avoid infinite loops



            try {

                // 1. Call the Refresh Token Endpoint

                // The browser automatically sends the 'refreshToken' cookie here

                await apiClient.post('/auth/refresh');



                // 2. If successful, the backend set a new 'accessToken' cookie.

                // Now retry the original request

                return apiClient(originalRequest);

               

            } catch (refreshError) {

                // If refresh fails (e.g., refresh token is also expired), force logout

                console.error("Session expired:", refreshError);

                // window.location.href = '/login';

                return Promise.reject(refreshError);

            }

        }



        return Promise.reject(error);

    }

);



export default apiClient;

