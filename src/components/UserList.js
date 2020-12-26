import React from "react";
import { Row, Col } from "react-reflex-grid";

const UserList = ({ list }) => {
    return (
        <>
            {list.length !== 0 && list.map(item => {
                return (
                    <Row key={item.id}>
                        <Col size={2}>
                            <img src={item.avatar_url}
                                width="50"
                                alt="user avatar" />
                        </Col>
                        <Col size={3}>
                            {item.login}
                        </Col>
                        <Col size={1}>
                            {item.type}
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}

export default UserList;