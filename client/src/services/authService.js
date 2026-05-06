import api from './api'

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    const { user, accessToken } = response.data
    localStorage.setItem('token', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    return { user, token: accessToken }
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    const { user, accessToken } = response.data
    localStorage.setItem('token', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    return { user, token: accessToken }
  },

  async logout() {
    try {
      // If we had a logout endpoint we'd call it here
      // await api.post('/auth/logout')
    } catch {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  async getProfile() {
    const response = await api.get('/user/profile')
    return response.data
  },

  async updateProfile(data) {
    const response = await api.put('/user/profile', data)
    const user = response.data
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token')
  },
}
