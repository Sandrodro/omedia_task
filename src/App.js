import React, { useEffect, useState } from 'react';
import Searchbox from './components/Searchbox';
import { requestAll, requestUser } from "./services/github_api.js";
import UserList from "./components/UserList"

const App = () => {

    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        let userList = [];
        requestAll()
            .then(res => {
                userList = res.data.items
                setList(userList);
            });
    }, [])

    useEffect(() => {
        console.log(list)
    }, [list])

    useEffect(() => {
        if (search !== "") {
            requestUser(search)
        }
    }, [search])

    return (
        <>
            <Searchbox
                search={search}
                setSearch={setSearch}
            />
            <UserList
                list={list}
            />
        </>
    )
}

export default App;