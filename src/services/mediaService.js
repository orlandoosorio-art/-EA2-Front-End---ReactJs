import { axiosInstance } from './axiosConfig';

export const getMedias = () => axiosInstance.get('medias');
export const crearMedia = (data) => axiosInstance.post('medias', data);
export const editarMedia = (mediaId, data) => axiosInstance.put(`medias/${mediaId}`, data);