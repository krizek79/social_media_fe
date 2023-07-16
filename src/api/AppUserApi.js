import axios from "axios"
import Cookies from "js-cookie"

const APP_USER_API_BASE_URL = "http://localhost:8080/app-users"

export default new class AppUserService {

    getAppUserByUsername(username) {
        return axios.get(APP_USER_API_BASE_URL + "/username/" + username, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    searchForAppUsersLikeUsername(page, size, cancelToken, username) {
        return axios.get(`${APP_USER_API_BASE_URL}/search?page=${page}&size=${size}&username=${username}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            },
            cancelToken: cancelToken
        })
    }

    getRandomUnfollowedAppUsers(page, size) {
        return axios.get(`${APP_USER_API_BASE_URL}/random?page=${page}&size=${size}`, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }

    updateAppUser(id, request) {
        return axios.put(APP_USER_API_BASE_URL + "/" + id, request, {
            headers: {
                Authorization: "Bearer " + Cookies.get("token")
            }
        })
    }
}