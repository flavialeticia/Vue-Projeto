import api from './api'

export default {
  getByResource(resourceId) {
    return api.get(`/subresources?resourceId=${resourceId}`).then(res => res.data)
  },
  create(data) {
    return api.post('/subresources', data).then(res => res.data)
  },
  update(id, data) {
    return api.put(`/subresources/${id}`, data).then(res => res.data)
  },
  remove(id) {
    return api.delete(`/subresources/${id}`)
  }
}
