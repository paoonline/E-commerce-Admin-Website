import React from 'react'
import Root from '../../Root'
import { ProductEdit } from '../../container'
import { mount } from 'enzyme'
import moxios from 'moxios'
import axios from 'axios'
import sinon from 'sinon'
import { ImageUploadFile } from '../../components/style'
import logo from '../../../public/images/default-image.jpg'
import { wait } from '@testing-library/react'

let wrapper

let onFulfilled = sinon.spy()
const dataTest = {
  productName: '12',
  productQuantity: 1,
  imagePath: '1'
}
beforeEach(() => {
  moxios.install()
  wrapper = mount(<Root><ProductEdit test={true} dataTest={dataTest} /></Root>)
});

afterEach(() => {
  wrapper.unmount()
  moxios.uninstall()
});