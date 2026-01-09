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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1. Check if it's a 401 error
        if (error.response?.status === 401) {

            // 2. CRITICAL FIX: If the URL that failed was ALREADY '/refresh', stop the loop.
            // This means your refresh token is dead. You must log out.
            if (originalRequest.url.includes('/refresh') || originalRequest._retry) {
                // Clear local storage
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken'); // If you store it there

                // Redirect to login
                window.location.href = '/login';
                return Promise.reject(error);
            }

            // 3. Mark this request as "retried" so we don't do it twice
            originalRequest._retry = true;

            try {
                // Attempt to refresh
                const response = await axios.post('http://localhost:5000/api/auth/refresh', {
                    // pass refresh token if needed, or rely on cookies
                });

                const { accessToken } = response.data;

                // Save new token
                localStorage.setItem('accessToken', accessToken);

                // Update header and retry original request
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return apiClient(originalRequest);

            } catch (refreshError) {
                // If refresh fails, redirect to login
                console.error("Refresh failed:", refreshError);
                localStorage.removeItem('accessToken');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;