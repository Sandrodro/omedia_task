import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-reflex-grid";

const UserPage = ({ user, userRepo, search, userOrg }) => {

    if (search === "") {
        user = JSON.parse(localStorage.getItem('selected-user'));
        userRepo = JSON.parse(localStorage.getItem('selected-repo'));
        userOrg = JSON.parse(localStorage.getItem('selected-org'));
    }
    return (
        user === "NOT FOUND" ?
            <>
                <Link to="/">
                    <button>HOME</button>
                </Link>
                <h1>NOT FOUND</h1>
            </> :
            <>
                <Link to="/">
                    <button>HOME</button>
                </Link>
                <Row align="end" className="userPageProfile">
                    <Col size={4}>
                        <Row align="end">
                            <Col size={6}>
                                <img src={user.avatar_url}
                                    width="140"
                                    alt="user avatar" />
                            </Col>
                            <Col size={6} bleed>
                                <h2><a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noreferrer">
                                    {user.login}
                                </a></h2>
                                <h3>{user.type}</h3>
                            </Col>
                        </Row>
                    </Col>
                    <Col size={3} bleed className="userInfo">
                        <h2>Repositories</h2>
                    </Col>
                    <Col size={3} bleed className="userInfo">
                        <h2>Organization</h2>
                    </Col>
                </Row>
                <Row justify-justify-space-around bleed>
                    <Col size={4}>
                    </Col>
                    <Col size={3} bleed>
                        {userRepo.length >= 3 ?
                            <>
                                <h3>{userRepo[0].name}</h3>
                                <h3>{userRepo[1].name}</h3>
                                <h3>{userRepo[2].name}</h3>
                            </>
                            :
                            <h2>NOT ENOUGH REPOSITORIES</h2>}
                    </Col>
                    <Col size={3}>
                        {userOrg[0] ?
                            <>
                                <img
                                    src={userOrg[0].avatar_url}
                                    alt="Organisation Avatar"
                                    width="100"
                                />
                                <h1><a
                                    href={userOrg[0].url}
                                    target="_blank"
                                    rel="noreferrer">
                                    {userOrg[0].login}
                                </a></h1>
                            </> :
                            <h2>NO ORG</h2>
                        }
                    </Col>
                </Row>
            </>
    )
}

export default UserPage;