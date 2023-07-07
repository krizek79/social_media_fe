import axios from "axios"
import Cookies from "js-cookie"

const LIKE_API_BASE_URL = "http://localhost:8080/likes"

export default new class LikeService {

    likePost(id) {
        return axios.post(LIKE_API_BASE_URL + "/post/" + id, null, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    unlikePost(id) {
        return axios.delete(LIKE_API_BASE_URL + "/post/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    likeComment(id) {
        return axios.post(LIKE_API_BASE_URL + "/comment/" + id, null,  {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    unlikeComment(id) {
        return axios.delete(LIKE_API_BASE_URL + "/comment/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }
}