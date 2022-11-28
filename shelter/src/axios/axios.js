import axios from 'axios';

export default axios.create({
  baseURL: 'http://159.223.213.207/api/v1',
  //baseURL: 'http://localhost:8080/api/v1',
});
