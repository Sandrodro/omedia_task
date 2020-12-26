import axios from "axios";

export const requestAll = () => {
    const baseurl = "https://api.github.com";
    const auth = "token 15036c7748a31c48cbe48d87b6bd7579365e55f4";

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
    const baseurl = "https://api.github.com";
    const auth = "token 15036c7748a31c48cbe48d87b6bd7579365e55f4";

    axios({
        method: "GET",
        url: `${baseurl}/search/users`,
        params: {
            q: user
        },
        headers: {
            accept: "application/vnd.github.v3+json",
            authorization: auth
        }
    })
}