import React from 'react'
import { mount } from 'enzyme'
import Root from '../../Root'
import Login from "../authen/login"
import moxios from 'moxios'
import config from '../../util/config'
import sinon from 'sinon'
import axios from 'axios'

let wrapped
let onFulfilled = sinon.spy()
beforeEach(() => {
    moxios.install();
    wrapped = mount(
        <Root>
            <Login test={true} />
        </Root>
    )
})

afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
})

it('count input', () => {
    expect(wrapped.find('input').length).toEqual(2)
})

describe('login and validate', () => {
    it('submit form empty', () => {
        wrapped.find('form').simulate('submit')
        wrapped.update()
        expect(wrapped.find('#error').text()).toEqual("Please input information")
    })

    it('submit form for login success', (done) => {
        wrapped.find('input#id').simulate('change', { target: { value: 1 } })
        wrapped.find('input#password').simulate('change', { target: { value: 1 } })
        wrapped.update()

        let new_wrapper = wrapped = mount(
            <Root>
                <Login />
            </Root>
        )
        axios.post('/signin').then(onFulfilled)
        moxios.withMock(function () {
            moxios.wait(function () {
                let request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: config.token
                }).then(function (val) {
                    expect(new_wrapper.find('#authen').text()).toEqual(" ")
                    expect(config.token.length).toEqual(153)
                    done()
                })
            })
        })

    })

    it('submit form for login fail', (done) => {
        wrapped.find('input#id').simulate('change', { target: { value: 1 } })
        wrapped.find('input#password').simulate('change', { target: { value: 1 } })
        wrapped.update()

        moxios.stubRequest("/signin", {
            status: 422,
            response: { status: "Unauthorized" }
        })

        moxios.wait(() => {
            expect(wrapped.find('#authen').text()).toEqual(" Unauthorized")
            done()
        });

    })
})



