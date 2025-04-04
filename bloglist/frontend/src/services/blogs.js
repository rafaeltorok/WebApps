import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const remove = blog => {
  return axios.delete(`${baseUrl}/${blog.id}`)
}

const update = updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update, setToken }