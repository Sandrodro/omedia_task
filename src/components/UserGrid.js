import React from "react";
import { Row, Col } from "react-reflex-grid";

const UserGrid = ({ list, repos }) => {
    return (
        <div>
            {list.length !== 0 && repos.length === 30 && list.map((item, index) => {
                let userArr = repos.filter(repo => repo[0].owner.login === item.login);
                return (
                    <Col size={3} key={item.id} className="gridItem">
                        <Row>
                            <Col size={2}>
                                <img src={item.avatar_url}
                                    width="50"
                                    alt="user avatar" />
                            </Col>
                            <Col size={4}>
                                <a href={item.html_url}
                                    rel="noreferrer"
                                    target="_blank">
                                    {item.login}
                                </a>
                                <br />
                                {item.type}
                            </Col>
                            <Col size={4}>
                                {userArr[0][0].name}<br />
                                {userArr[0][1].name}<br />
                                {userArr[0][2].name}
                            </Col>
                        </Row>
                    </Col>
                )
            })}
        </div>
    )
}

export default UserGrid