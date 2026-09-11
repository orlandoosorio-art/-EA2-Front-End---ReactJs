import { axiosInstance } from './axiosConfig';

export const getDirectores = () => axiosInstance.get('directores');
export const crearDirector = (data) => axiosInstance.post('directores', data);
export const editarDirector = (directorId, data) => axiosInstance.put(`directores/${directorId}`, data);