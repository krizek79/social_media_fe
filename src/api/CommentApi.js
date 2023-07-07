import axios from "axios"
import Cookies from "js-cookie"

const COMMENT_API_BASE_URL = "http://localhost:8080/comments"

export default new class CommentService {

    getAllCommentsByPostId(id) {
        return axios.get(COMMENT_API_BASE_URL + "/post/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    getCommentById(id) {
        return axios.get(COMMENT_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    createComment(request) {
        return axios.post(COMMENT_API_BASE_URL, request, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    updateComment(id, request) {
        return axios.patch(COMMENT_API_BASE_URL + "/" + id, request, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    deleteComment(id) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }
}