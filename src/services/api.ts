import axios from 'axios';
const api = axios.create({
  baseURL: 'http://10.10.149.59:3333',
});
export {api};