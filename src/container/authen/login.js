import React, { useState, useEffect } from 'react';
import { Title, TextValidate } from '../../components'
import { FlexLogin} from '../../components/style'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [requird, setRequird] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === "" || password === "") {
            setRequird(true)
            return
        }
        props.onLogin(email, password)
    }

    useEffect(() => {
        if (props.isAuthenticated && props.history.location.pathnname === '/login') {
            props.history.push('/products/productList')
        }
        return () => {
        };
    }, [props, props.isAuthenticated])

    return (
            <FlexLogin>
                <Card>
                    <Title>
                        Welcome
                    </Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            <Input
                                id="id"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                id="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={props.loading}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    {((email === "" || password === "") && requird)  && <TextValidate id="error">Please input information</TextValidate>}
                    <TextValidate id="authen">{props.error} {props.test && "Unauthorized"}</TextValidate>
                </Card>
            </FlexLogin>
    )
}


const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))