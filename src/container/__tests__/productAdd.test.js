import React from 'react'
import Root from '../../Root'
import { ProductAdd } from '../../container'
import { mount } from 'enzyme'
import moxios from 'moxios'
import axios from 'axios'
import sinon from 'sinon'
import { ImageUploadFile } from '../../components/style'
import logo from '../../../public/images/default-image.jpg'
let wrapper

let onFulfilled = sinon.spy()
beforeEach(() => {
  moxios.install()
  wrapper = mount(<Root><ProductAdd /></Root>)
});

afterEach(() => {
  wrapper.unmount()
  moxios.uninstall()
});