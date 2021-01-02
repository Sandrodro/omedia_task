import axios from "axios";

const baseurl = "https://api.github.com";
const auth = "token c9605801548fb802645fbf92f6d79a97524f31df";

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