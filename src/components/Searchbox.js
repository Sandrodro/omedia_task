import React from "react";
import { Link } from "react-router-dom";

const Searchbox = ({ search, setSearch, setShowUser }) => {
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={e => {
                    setSearch(e.target.value)
                }}
            />
            <Link to={`/${search}`}>
                <button
                    onClick={() => setShowUser(showUser => !showUser)}
                >SEARCH</button>
            </Link>
        </div>
    )
}

export default Searchbox;