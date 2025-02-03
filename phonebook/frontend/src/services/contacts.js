import axios from 'axios';
const baseUrl = '/api/contacts';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const deleteContact = contact => {
    return axios.delete(`${baseUrl}/${contact.id}`);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getAll, create, deleteContact, update };