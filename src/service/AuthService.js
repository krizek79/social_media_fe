import axios from "axios"

const AUTH_API_BASE_URL = "http://localhost:8080/auth"

export default new class AuthService {

    register(request) {
        return axios.post(AUTH_API_BASE_URL + "/register", request)
    }

    login(request) {
        return axios.post(AUTH_API_BASE_URL + "/login", request)
    }

    refreshToken(request) {
        return axios.post(AUTH_API_BASE_URL + "/refreshToken", request)
    }

    logout() {
        localStorage.removeItem("authenticationToken")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
    }
}