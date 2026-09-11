import { axiosInstance } from './axiosConfig';

export const getTipos = () => axiosInstance.get('tipos');
export const crearTipo = (data) => axiosInstance.post('tipos', data);
export const editarTipo = (tipoId, data) => axiosInstance.put(`tipos/${tipoId}`, data);