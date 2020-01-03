import React from 'react'
import Root from '../../Root'
import { ProductList } from '../../page'
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

describe('productList showElement', () => {
  it('table showData', () => {
    expect(wrapper.find('table').length).toEqual(1)
  })

  it('table noData', () => {
    wrapper = mount(<Root><ProductList test={true} tableNodata={true} dataTest={dataTest} /></Root>)
    expect(wrapper.find('table').length).toEqual(0)
  })

  it('click create to navigation to createProduct', () => {
    const url = '/products/productAdd'
    expect(wrapper.find('button#button-direct').text()).toEqual("CREATE")
    expect(wrapper.find('button#button-direct').length).toEqual(1)
    wrapper.find('button#button-direct').simulate('click')
    window.history.pushState({}, '', `${url}`);
    expect(window.location.pathname).toEqual(window.location.pathname)
  })

  it('click edit to navigation to editProduct', () => {
    const url = '/products/productEdit/test'
    expect(wrapper.find('i.anticon-edit').first().length).toEqual(1)
    wrapper.find('i.anticon-edit').first().simulate('click')
    window.history.pushState({}, '', `${url}`);
    expect(window.location.pathname).toEqual(window.location.pathname)
  })

  it('click DeleteProduct', (done) => {
    wrapper.find('i.anticon-delete').first().simulate('click')
    wrapper.update()
    expect(wrapper.find('div#modalDelete').first().length).toEqual(1)
    wrapper.update()

    axios.post('/product_delete?_id=1').then(onFulfilled)
    moxios.withMock(function () {
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: { status: true }
        }).then(function (val) {
          wrapper = mount(<Root><ProductList test={true} tableNodata={true} dataTest={dataTest} /></Root>)
          expect(wrapper.find('table').length).toEqual(0)
          done()
        })
      })
    })
  })

  it('search product', () => {
    wrapper.find('input').simulate('change', { target: { value: 1 } })
    wrapper.update()
    expect(wrapper.find('input').props().value).toEqual(1)
  })
})
