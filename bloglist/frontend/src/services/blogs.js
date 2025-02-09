import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config);
  return request.then(response => response.data);
};

const deleteContact = blog => {
    return axios.delete(`${baseUrl}/${blog.id}`);
};

export default { getAll, create, deleteContact, setToken };