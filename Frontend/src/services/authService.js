import apiClient from "./apiClient";

export const saveOnboardingData = async (data) => {
    try {
        const response = await apiClient.put('/auth/onboarding', data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Onboarding failed";
    }
};