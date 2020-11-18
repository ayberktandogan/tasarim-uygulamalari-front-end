import axios from '../config/axios/axios'

export default async function postDataToAPI({ route, data }) {
    let user
    try {
        user = JSON.parse(localStorage.getItem('user'))
    } catch (err) {
        console.log(err)
    }

    return await axios.post(route, data, { headers: { authorization: user.token } })
}