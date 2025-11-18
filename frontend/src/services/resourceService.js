import api from './api'

export default {
  getAll() {
    return api.get('/resources').then(res => res.data)
  },
  create(data) {
    return api.post('/resources', data).then(res => res.data)
  },
  update(id, data) {
    return api.put(`/resources/${id}`, data).then(res => res.data)
  },
  remove(id) {
    return api.delete(`/resources/${id}`)
  }
}
