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


