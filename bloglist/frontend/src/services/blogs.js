import axios from 'axios';
const baseUrl = '/api/bloglist';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const deleteContact = blog => {
    return axios.delete(`${baseUrl}/${blog.id}`);
};

export default { getAll, create, deleteContact };