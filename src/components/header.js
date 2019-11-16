import React from 'react';
import { Row, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
const { Title } = Typography;

const Header = ({ title, link, text }) => (
    <div>
        <Row justify="space-between" type="flex">
            <Title level={2}>{title}</Title>
            <Button type="primary" style={{ marginTop: 7 }}>
                <Link to={link}>{text}</Link>
            </Button>
        </Row>
    </div>
)

export default Header