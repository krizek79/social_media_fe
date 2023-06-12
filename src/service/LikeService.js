import axios from "axios";

const LIKE_API_BASE_URL = "http://localhost:8080/likes"

export default new class LikeService {

    likePost(id) {
        return axios.post(LIKE_API_BASE_URL + "/post/" + id, null, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    unlikePost(id) {
        return axios.delete(LIKE_API_BASE_URL + "/post/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    likeComment(id) {
        return axios.post(LIKE_API_BASE_URL + "/comment/" + id, null,  {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    unlikeComment(id) {
        return axios.delete(LIKE_API_BASE_URL + "/comment/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }
}