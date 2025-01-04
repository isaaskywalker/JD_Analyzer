import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeJD = async (jdText) => {
    try {
        const response = await apiClient.post('/analyze', { jd: jdText });
        return response.data;
    } catch (error) {
        console.error('JD 분석 중 오류 발생:', error);
        throw error;
    }
};