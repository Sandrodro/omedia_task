//The main APP component which holds all state and lifecycle methods

import React, { useEffect, useState } from 'react';
import Searchbox from './components/Searchbox';
import UserList from "./components/UserList"
import UserGrid from "./components/UserGrid"
import UserPage from "./components/UserPage"
import { requestAll, requestRepo, requestUser, requestOrg } from "./services/github_api.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    //STATE ------------------------------------------------------------------

    //State that holds what is being curently typed in the searchbar
    const [search, setSearch] = useState("");

    //State that holds which user are we searching for
    const [user, setUser] = useState([]);

    //State for the searched user's 3 repos
    const [userRepo, setUserRepo] = useState([]);

    //State for the searched user's Organisation info
    const [userOrg, setUserOrg] = useState([]);

    //State that knows whether the information about one specific user is being displayed
    //It is mainly used as a dependancy in useEffect hooks. Upon changing this state, the information
    //Regarding the user is loaded in relevant states - user, userRepo and userOrg
    const [showUser, setShowUser] = useState(false);

    //Loads the Avatar, Login and Type for the most popular users, to be displayed on home page - either
    //as a list or as a grid
    const [list, setList] = useState([]);

    //Loads the 3 most recent repos of the most popular users, to be displayed on home page - either 
    //as a lsit or as a grid
    const [repos, setRepos] = useState([]);

    //Triggers Grid view or List view
    const [showGrid, setShowGrid] = useState(false);

    //State responsible for showing the search history
    const [history, setHistory] = useState([]);


    //LIFECYCLE METHODS ---------------------------------------------------

    //loads the Avatar, Login and Type info from Github API using an axios request, that's
    //defined in a separate file
    useEffect(() => {
        let userList = [];
        requestAll()
            .then(res => {
                userList = res.data.items
                setList(userList);
            });
    }, [])

    //loads the Repository info from Github API using an axios request, that's
    //defined in a separate file
    useEffect(() => {
        let repoArray = [];
        list.map(item => {
            return requestRepo(item.login)
                .then(res => repoArray = repoArray.concat([[res.data[0], res.data[1], res.data[2]]]))
                .then(() => setRepos(repoArray))
        })
    }, [list])

    ////loads the specific user info from Github API using an axios request, that's
    //defined in a separate file. This info is then displayed on the separate user page
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

    //loads the specific user --repository-- info from Github API using an axios request, that's
    //defined in a separate file. This info is then displayed on the separate user page
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

    //loads the specific user --organisation-- info from Github API using an axios request, that's
    //defined in a separate file. This info is then displayed on the separate user page
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


    //Loads the search history from localStorage, if the information exists there
    useEffect(() => {
        let hist = JSON.parse(localStorage.getItem("history"))
        if (!hist) {
            setHistory([])
        } else {
            setHistory(hist)
        }
    }, [])

    //Uploads search terms to localStorage
    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history])

    return (
        <>
            <Router>
                {/* The Searchbox component is available in all views of the app */}
                <Searchbox
                    search={search}
                    setSearch={setSearch}
                    setShowUser={setShowUser}
                    showUser={showUser}
                    setHistory={setHistory}
                />
                <Switch>
                    <Route exact path="/">
                        <button onClick={() => {
                            setShowGrid(prev => !prev)
                        }}>{showGrid === false ? "GRID VIEW" : "LIST VIEW"}</button>
                        {history.length > 0 ? <div>
                            Search History:
                                <span className="history">{history[history.length - 1]}</span>
                            <span className="history">{history[history.length - 2]}</span>
                            <span className="history">{history[history.length - 3]}</span>
                        </div> : null}
                        {showGrid ?
                            // List and Grid views
                            < UserGrid
                                list={list}
                                repos={repos} /> :
                            <UserList
                                list={list}
                                repos={repos}
                            />}
                    </Route>
                    <Route path={`/${search}`}>
                        {/* User Page view */}
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