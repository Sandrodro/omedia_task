import React, { useEffect, useState } from 'react';
import Searchbox from './components/Searchbox';
import { requestAll, requestRepo, requestUser, requestOrg } from "./services/github_api.js";
import UserList from "./components/UserList"
import UserGrid from "./components/UserGrid"
import UserPage from "./components/UserPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    const [search, setSearch] = useState("");
    const [user, setUser] = useState([]);
    const [userRepo, setUserRepo] = useState([]);
    const [userOrg, setUserOrg] = useState([]);
    const [showUser, setShowUser] = useState(false);
    const [list, setList] = useState([]);
    const [repos, setRepos] = useState([]);
    const [showGrid, setShowGrid] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

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
                localStorage.setItem("selected-user", JSON.stringify(res.data));
            })
            .catch(() => {
                setUser("NOT FOUND")
            })
    }, [showUser])

    useEffect(() => {
        requestRepo(search)
            .then(res => {
                setUserRepo(res.data)
                localStorage.setItem("selected-repo", JSON.stringify(res.data))
            })
            .catch(() => {
                setUserRepo("NOT FOUND")
            })
    }, [showUser])

    useEffect(() => {
        requestOrg(search)
            .then(res => {
                setUserOrg(res.data)
                localStorage.setItem("selected-org", JSON.stringify(res.data))
                console.log(res.data);
            })
            .catch(() => {
                setUserOrg("NOT FOUND")
            })
    }, [showUser])

    return (
        <>
            <Router>
                <Searchbox
                    search={search}
                    setSearch={setSearch}
                    setShowUser={setShowUser}
                    showUser={showUser}
                />
                <Switch>
                    <Route exact path="/">
                        <button onClick={() => {
                            setShowGrid(prev => !prev)
                        }}>{showGrid === false ? "GRID VIEW" : "LIST VIEW"}</button>
                        <div>
                            Recent Searches: 
                            
                        </div>
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
                            search={search}
                            userOrg={userOrg}
                        />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App;