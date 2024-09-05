import axios from 'axios';

const api = axios.create({
  baseURL: '/api/powerbi',
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/data/upload', formData);
};

export const getReportUrl = () => {
  return api.get('/data/report');
};
