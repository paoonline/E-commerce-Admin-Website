import React, { useState } from 'react';
import styled from 'styled-components'
import { Title } from '../../components'
import { Form, Icon, Input, Button } from 'antd';
import axios from '../../util/axios'

const Flex = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    flex-direction:column;
`

const handleSubmit = (e) => {

}

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    return (
        <Flex>
            <Title>
                Welcome
            </Title>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}

export default Login