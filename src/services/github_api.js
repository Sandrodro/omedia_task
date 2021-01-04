import axios from "axios";

const baseurl = "https://api.github.com";
const auth = "token 449a11328076fd5566b04ad891f4c9cf9384983f";

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

export const requestOrg = user => {
    return axios({
        method: "GET",
        url: `${baseurl}/users/${user}/orgs`,
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: auth
        }
    })
}