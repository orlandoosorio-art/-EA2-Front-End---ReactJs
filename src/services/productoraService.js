import { axiosInstance } from './axiosConfig';

export const getProductoras = () => axiosInstance.get('productoras');
export const crearProductora = (data) => axiosInstance.post('productoras', data);
export const editarProductora = (productoraId, data) => axiosInstance.put(`productoras/${productoraId}`, data);