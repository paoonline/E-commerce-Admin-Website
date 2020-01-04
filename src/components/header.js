import React from 'react';
import { Row, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
const { Title } = Typography;

const Header = ({ title, link, text, create, loading }) => (
    <div>
        {create}
        <Row justify="space-between" type="flex">
            <Title level={2}>{title}</Title>
            <div>
                <Button type="primary" style={{ marginTop: 7, marginRight: 10 }} id="button-direct">
                    <Link to={link}>{text}</Link>
                </Button>
                {create && <Button type="primary" style={{ marginTop: 7, marginLeft: 20 }} htmlType="submit" loading={loading}>
                    SAVE
                </Button>
                }
            </div>
        </Row>
        <hr />
    </div>
)

export default Header