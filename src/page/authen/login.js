import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Title, TextValidate } from '../../components'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { withRouter } from 'react-router-dom'

const Flex = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    flex-direction:column;
`

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [requird, setRequird] = useState(false)
    
    const handleSubmit = e => {
        e.preventDefault()
        if (email === "" || password === "") {
            setRequird(true)
            return
        }
        props.onLogin(email, password)
    }

    useEffect(() => {
        if(props.isAuthenticated){
            props.history.push('/productList')
        }
        return () => {
            console.log("cleaned up");
          };
    },[props, props.isAuthenticated])

    return (
        <Flex>
            <Title>
                Welcome
            </Title>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            {((email === "" || password === "") && requird) && <TextValidate>โปรดกรอกข้อมูล</TextValidate>}
        </Flex>
    )
}


const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null // token from authen
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))