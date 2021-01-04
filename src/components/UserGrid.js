import React from "react";
import { Row, Col } from "react-reflex-grid";

const UserGrid = ({ list, repos }) => {
    return (
        <div>
            <Row justify-center>
                {list.length !== 0 && repos.length === 30 && list.map((item, index) => {
                    let userArr = repos.filter(repo => repo[0].owner.login === item.login);
                    return (
                        <Col size={4} key={item.id} className="gridItem" sm>
                            <Row justify-content-center>
                                <Col size={2}>
                                    <img src={item.avatar_url}
                                        width="50"
                                        alt="user avatar" />
                                </Col>
                                <Col size={4} className="gridLogin">
                                    <a href={item.html_url}
                                        rel="noreferrer"
                                        target="_blank">
                                        {item.login}
                                    </a>
                                    <br />
                                    {item.type}
                                </Col>
                                <Col size={6} bleed>
                                    <p>
                                        {userArr[0][0].name}
                                    </p>
                                    <p>
                                        {userArr[0][1].name}
                                    </p>
                                    <p>
                                        {userArr[0][2].name}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default UserGrid