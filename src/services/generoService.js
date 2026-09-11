import { axiosInstance } from './axiosConfig';

export const getGeneros = () => {
  return axiosInstance.get('generos');
};

export const crearGenero = (data) => {
  return axiosInstance.post('generos', data);
};

export const editarGenero = (generoId, data) => {
  return axiosInstance.put(`generos/${generoId}`, data);
};