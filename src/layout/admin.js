import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Title } from '../components'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import * as actions from '../store/action'
import { connect } from 'react-redux'

const { Header, Sider, Content } = Layout;

const Admin = ({ children, onLogout, history }) => {
    const handleLogout = () => {
        onLogout(() => history.push('/login'))
    }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout style={{ height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="0" style={{ marginBottom: '3rem', marginTop: '1rem' }}>
                        <Icon type="shopping-cart" style={{ fontSize: 18 }} />
                        <Title>Web admin</Title>
                    </Menu.Item>

                    <Menu.Item key="1">
                        <Link to="/productList">
                            <Icon type="shop" />
                            <span>Product</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="2" onClick={() => handleLogout()}>
                        <Icon type="logout" />
                        <span>Logout</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        style={{ marginLeft: "1rem" }}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Admin))