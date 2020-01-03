import React from 'react'
import Root from '../../Root'
import { ProductAdd } from '../../page'
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

describe('productAdd test', () => {

  it('test submit form fail', () => {
    wrapper.find('form').simulate('submit')
    wrapper.update()
    expect(wrapper.find('div.ant-form-explain').first().text()).toEqual('Please input your prodcutName!')
  })

  it('test submit form service success', (done) => {
    const ImageProduct = mount(<ImageUploadFile src={logo} />);
    expect(ImageProduct.props().src).toEqual(logo)

    wrapper.find('input#productAdd_productName').simulate('change', { target: { value: 1 } })
    wrapper.find('input#productAdd_productQuantity').simulate('change', { target: { value: 1 } })
    wrapper.find('div.DraftEditor-root').simulate('change', { target: { value: 1 } })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    wrapper.update()

    axios.post('/product_create').then(onFulfilled)
    moxios.withMock(function () {
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: {
            status: true
          }
        }).then(function (val) {
          expect(val.data.status).toEqual(true)
          done()
        })
      })
    })
  })

  it('test submit form service fail', (done) => {
    wrapper.find('input#productAdd_productName').simulate('change', { target: { value: 1 } })
    wrapper.find('input#productAdd_productQuantity').simulate('change', { target: { value: 1 } })
    wrapper.find('div.DraftEditor-root').simulate('change', { target: { value: 1 } })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    wrapper.update()

    moxios.stubRequest("/product_create", {
      status: 422,
      response: { status: "please check productName duplicate" }
    })
    moxios.wait(() => {
      done()
    });
  })
})
