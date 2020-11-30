import axios from 'axios'
import defaultUser from '../localStorage/user'

const instance = axios.create({
    baseURL: '/api/v1'
})

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = defaultUser.token || undefined

    return config
})

export default instance
