import axios from "axios"
import Cookies from "js-cookie"

const FOLLOW_API_BASE_URL = "http://localhost:8080/follows"

export default new class FollowService {

    follow(id) {
        return axios.post(FOLLOW_API_BASE_URL + "/" + id, null, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    unfollow(id) {
        return axios.delete(FOLLOW_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }
}