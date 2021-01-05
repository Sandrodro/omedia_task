//This is the file that holds functions for interacting with the GithubApi

import axios from "axios";

//The base url of the app
const baseurl = "https://api.github.com";

//Github authorization token, which is loaded from the environment variable
const auth = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;


//This requests the Avatar, login and type info from the api, ordered by followers
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


//This requests the Avatar, login and type info from the api for a specific user
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

//Requests Repo info for a given user
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


//Requests the Organisation info for a specific user
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