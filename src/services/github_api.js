import axios from "axios";

const baseurl = "https://api.github.com";
const auth = "token a5d1daa609b7220597e694913a8d50dfb6a56d4c";

export const requestAll = () => {
    return axios({
        method: "GET",
        url: `${baseurl}/search/users`,
        params: {
            q: "followers:>1000",
            sort: 'followers',
            order: "desc"
        },
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: auth
        }
    })
}

export const requestUser = user => {
    return axios({
        method: "GET",
        url: `${baseurl}/users/${user}`,
        params: {
            q: user
        },
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: auth
        }
    })
}

export const requestRepo = user => {
    return axios({
        method: "GET",
        url: `${baseurl}/users/${user}/repos`,
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: auth
        },
        params: {
            per_page: 3,
            sort: "updated"
        }
    })
}