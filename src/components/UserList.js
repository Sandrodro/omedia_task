import React from "react";
import { Row, Col } from "react-reflex-grid";

const UserList = ({ list, repos }) => {
    return (
        <>
            {list.length !== 0 && repos.length === 30 && list.map(item => {
                let userArr = repos.filter(repo => repo[0].owner.login === item.login);
                return (
                    <Row key={item.id}>
                        <Col size={2}>
                            <img src={item.avatar_url}
                                width="50"
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