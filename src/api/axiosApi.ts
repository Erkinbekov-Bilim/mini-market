import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://js-30-bilim-default-rtdb.europe-west1.firebasedatabase.app',
});

export default axiosApi;
