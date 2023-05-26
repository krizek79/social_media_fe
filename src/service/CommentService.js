import axios from "axios"

const COMMENT_API_BASE_URL = "http://localhost:8080/comments"

export default new class CommentService {

    getAllCommentsByPostId(id) {
        return axios.get(COMMENT_API_BASE_URL + "/post/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    getCommentById(id) {
        return axios.get(COMMENT_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    createComment(request) {
        return axios.post(COMMENT_API_BASE_URL, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    updateComment(id, request) {
        return axios.patch(COMMENT_API_BASE_URL + "/" + id, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    deleteComment(id) {
        return axios.delete(COMMENT_API_BASE_URL + "/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    getAllPostsByUsername(username) {
        return axios.get(POST_API_BASE_URL + "?username=" + username, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }
}