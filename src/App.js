import React, { useEffect, useState } from 'react';
import Searchbox from './components/Searchbox';
import { requestAll, requestRepo, requestUser } from "./services/github_api.js";
import UserList from "./components/UserList"
import UserGrid from "./components/UserGrid"
import UserPage from "./components/UserPage"
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {

    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [userRepo, setUserRepo] = useState([]);
    const [showUser, setShowUser] = useState(false);
    const [list, setList] = useState([]);
    const [repos, setRepos] = useState([]);
    const [showGrid, setShowGrid] = useState(false);

    useEffect(() => {
        let userList = [];
        requestAll()
            .then(res => {
                userList = res.data.items
                setList(userList);
            });
    }, [])

    useEffect(() => {
        let repoArray = [];
        list.map(item => {
            return requestRepo(item.login)
                .then(res => repoArray = repoArray.concat([[res.data[0], res.data[1], res.data[2]]]))
                .then(() => setRepos(repoArray))
        })
    }, [list])

    useEffect(() => {
        requestUser(search)
            .then(res => {
                setUser(res.data)
            })
            .catch(() => setUser("NOT FOUND"))
    }, [showUser])

    useEffect(() => {
        requestRepo(search)
            .then(res => setUserRepo(res.data));
    }, [search])

    return (
        <>
            <Router>
                <Searchbox
                    search={search}
                    setSearch={setSearch}
                    setShowUser={setShowUser}
                    showUser={showUser}
                />
                <button onClick={() => {
                    setShowGrid(prev => !prev);
                }}>DISPLAY</button>
                <Route exact path="/">
                    {showGrid ?
                        <UserGrid
                            list={list}
                            repos={repos} /> :
                        <UserList
                            list={list}
                            repos={repos}
                        />}
                </Route>
                <Route path={`/${search}`}>
                    <UserPage
                        user={user}
                        userRepo={userRepo}
                    />
                </Route>
            </Router>
        </>
    )
}

export default App;