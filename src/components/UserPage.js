import React from "react";
import { Link } from "react-router-dom";

const UserPage = ({ user, userRepo }) => {
    return (
        user === "NOT FOUND" ?
            <>
                <Link to="/">
                    <button>HOME</button>
                </Link>
                <h1>NOT FOUND</h1>
            </> :
            <>
                {console.log(userRepo)}
                <Link to="/">
                    <button>HOME</button>
                </Link>
                <img src={user.avatar_url}
                    width="50"
                    alt="user avatar" />
                <h1><a href={user.html_url}>
                    {user.login}
                </a></h1>
                {userRepo.length >= 3 ?
                    <>
                        <h1>{user.type}</h1>
                        <h2>{userRepo[0].name}</h2>
                        <h2>{userRepo[1].name}</h2>
                        <h2>{userRepo[2].name}</h2>
                    </>
                    :
                    <h1>NO REPOS</h1>}
            </>
    )
}

export default UserPage;