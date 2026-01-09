import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Sends HttpOnly cookies
    headers: {
        "Content-Type": "application/json",
    }
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // 🛑 GUARD CLAUSE 1: Network Errors
        // If there is no response (server down), reject immediately
        if (!error.response) {
            return Promise.reject(error);
        }

        // 🛑 GUARD CLAUSE 2: Avoid Infinite Loops
        // If the error comes from the Refresh Endpoint, it means the Refresh Token is dead.
        // DO NOT try to refresh again. Redirect to login.
        if (originalRequest.url.includes("/auth/refresh")) {
            // Optional: clear user state here if you have access to it
            window.location.href = "/login"; 
            return Promise.reject(error);
        }

        // 🛑 GUARD CLAUSE 3: Avoid Refreshing on Login Failures
        // If the user entered a wrong password on the login page, we get a 401.
        // We should NOT try to refresh the token in this case. Just let the error pass to the UI.
        if (originalRequest.url.includes("/auth/login")) {
            return Promise.reject(error);
        }

        // 🔄 REFRESH LOGIC
        // Only run if it's a 401 and we haven't retried yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark this request so we don't loop

            try {
                // 1. Attempt to get a new Access Token
                await apiClient.post('/auth/refresh');

                // 2. If successful, retry the ORIGINAL request
                // Axios will run the original request again with the new cookie automatically
                return apiClient(originalRequest);

            } catch (refreshError) {
                // 3. If Refresh fails, the session is truly expired.
                console.error("Session expired. Redirecting to login.");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        // If it's not a 401, or if it's some other error, just throw it.
        return Promise.reject(error);
    }
);

export default apiClient;