import React from 'react'
import Root from '../../Root'
import { ProductList } from '../../container'
import { mount } from 'enzyme'
import moxios from 'moxios'
import sinon from 'sinon'
import axios from 'axios'

let wrapper, dataTest;
let onFulfilled = sinon.spy()
dataTest = [
  {
    imagePath: "",
    _id: "5dfe2ac988d1eb0023e93f8c",
    productName: "1",
    productModify: "2019-12-21T14:23:05.998Z",
    productQuantity: 11
  },
  {
    imagePath: "",
    _id: "5dfe2ac988d1eb0023e93f11",
    productName: "2",
    productModify: "2019-12-21T14:23:05.998Z",
    productQuantity: 11
  },
]

beforeEach(() => {
  moxios.install()
  wrapper = mount(<Root><ProductList test={true} dataTest={dataTest} /></Root>)
});

afterEach(() => {
  wrapper.unmount()
  moxios.uninstall()
});