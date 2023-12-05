import axios from 'axios'

const api = axios.create({
    baseURL: 'http://52.0.105.39'
})

export default api;