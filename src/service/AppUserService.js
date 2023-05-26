import axios from "axios"

const APP_USER_API_BASE_URL = "http://localhost:8080/app-users"

export default new class AppUserService {

    getAppUserByUsername(username) {
        return axios.get(APP_USER_API_BASE_URL + "/username/" + username, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }

    updateAppUser(id, request) {
        return axios.put(APP_USER_API_BASE_URL + "/" + id, request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authenticationToken")
            }
        })
    }
}