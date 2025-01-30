import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const deletePerson = person => {
    return axios.delete(`${baseUrl}/${person.id}`);
};

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getAll, create, deletePerson, update };