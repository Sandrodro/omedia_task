import React from "react";
import { Link } from "react-router-dom";

const Searchbox = ({ search, setSearch, setShowUser }) => {
    return (
        <nav className="searchBox">
            <input
                type="text"
                value={search}
                onChange={e => {
                    setSearch(e.target.value)
                }}
            />
            <Link to={`/${search}`}>
                <button
                    onClick={() => {
                        setShowUser(showUser => !showUser)
                        localStorage.setItem("last-searches", search)
                    }}
                >SEARCH</button>
            </Link>
        </nav>
    )
}

export default Searchbox;