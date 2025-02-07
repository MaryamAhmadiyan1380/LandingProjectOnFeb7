import http from './httpService';

const urlCategories = 'https://api.escuelajs.co';

export const apiGetCategories = async() => {
    try {
        const response = await http.get(`${urlCategories}/api/v1/categories`);
        return response.data;
    } catch (error) {
        console.error('get category error is:', error);
    }
};
