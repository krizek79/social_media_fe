import axios from "axios"
import Cookies from "js-cookie"

const POST_API_BASE_URL = "http://localhost:8080/posts"

export default new class PostService {

    getAllPosts(page, size) {
        return axios.get( `${POST_API_BASE_URL}?page=${page}&size=${size}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    getPostById(id) {
        return axios.get(`${POST_API_BASE_URL}/${id}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    createPost(request) {
        return axios.post(POST_API_BASE_URL, request, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    updatePost(id, request) {
        return axios.patch(`${POST_API_BASE_URL}/${id}`, request, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    deletePost(id) {
        return axios.delete(`${POST_API_BASE_URL}/${id}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    getAllPostsByUsername(username, page, size) {
        return axios.get(`${POST_API_BASE_URL}/username/${username}?page=${page}&size=${size}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }
}