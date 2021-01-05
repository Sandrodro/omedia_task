//Component for the List view of the app

import React from "react";
//These are components from the reflex-grid library
import { Row, Col } from "react-reflex-grid";

const UserList = ({ list, repos }) => {
    return (
        <>
            {/* This Row is the index header at the top of the page */}
            <Row justify-center className="index">
                <Col size={2} className="avatar">
                    Avatar
            </Col>
                <Col size={3}>
                    Username
            </Col>
                <Col size={1}>
                    Type
            </Col>
                <Col size={3}>
                    Repositories
            </Col>
            </Row>
            {/* If the information is available to the state, renders info about the most popular users */}
            {list.length !== 0 && repos.length === 30 && list.map(item => {
                let userArr = repos.filter(repo => repo[0].owner.login === item.login);
                return (
                    <Row key={item.id} className="userListRow" justify-center>
                        <Col size={2}>
                            <img src={item.avatar_url}
                                width="90"
                                alt="user avatar" />
                        </Col>
                        <Col size={3}>
                            <a href={item.html_url}
                                rel="noreferrer"
                                target="_blank">
                                {item.login}
                            </a>
                        </Col>
                        <Col size={1}>
                            {item.type}
                        </Col>
                        <Col size={3}>
                            {userArr[0][0].name}<br />
                            {userArr[0][1].name}<br />
                            {userArr[0][2].name}
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}

export default UserList;