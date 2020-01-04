import React from 'react'
import Root from '../../Root'
import { ProductEdit } from '../../page'
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

describe('productEdit test', () => {
  it('test submit form fail', () => {
    wrapper.find('input#productEdit_productName').simulate('change', { target: { value: "" } })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    wrapper.update()
    expect(wrapper.find('div.ant-form-explain').first().text()).toEqual('Please input your prodcutName!')
  })

  it('test submit form service fail', async (done) => {
    wrapper.find('input#productEdit_productName').simulate('change', { target: { value: 2 } })
    wrapper.update()
    wrapper.find('form').simulate('submit')
    await wait(() => {
      wrapper.update();
      moxios.stubRequest("/product_update", {
        status: 422,
        response: { status: "please check productName duplicate" }
      })
      moxios.wait(() => {
        done()
      });
    });
  })

  it('test submit form service success', async () => {
    const ImageProduct = mount(<ImageUploadFile src={logo} />);
    expect(ImageProduct.props().src).toEqual(logo)
    wrapper.find('form').simulate('submit')
    axios.post('/product_update').then(onFulfilled)
    await wait(() => {
      wrapper.update()
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
  })
})
