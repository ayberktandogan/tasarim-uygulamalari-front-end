import axios from '../config/axios/axios'

export default async function getDataFromAPI({ route, limit }) {
    let user
    try {
        user = JSON.parse(localStorage.getItem('user'))
    } catch (err) {
        console.log(err)
    }

    return await axios.get(route, { params: { limit }, headers: { authorization: user.token } })
}