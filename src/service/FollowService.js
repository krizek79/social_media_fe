import axios from "axios";

const FOLLOW_API_BASE_URL = "http://localhost:8080/follows"

export default new class FollowService {

    follow(id) {
        return axios.post(FOLLOW_API_BASE_URL + "/" + id, null, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    unfollow(id) {
        return axios.delete(FOLLOW_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }
}