import React, { useState } from 'react'
import { Header, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { apiGatewayInstance } from '../../util/axiosInstance'
import { withRouter } from 'react-router-dom'

const ProductAdd = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [validate, setValidate] = useState(true)
    const [loading, setLoading] = useState(false)

    const { getFieldDecorator } = props.form;
    const func = {
        imageFile: (val) => setImageFile(val)
    }

    const handleUpload = (_id) => {
        let formData = new FormData()
        formData.append('image', imageFile)
        formData.append('_id', _id)
        try {
            apiGatewayInstance.post('/image_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: props.token,
                }
            }).then((val) => {
                return true
            }).catch(() => {
                Modal.error({
                    content: 'please check imageFile',
                });
            })
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {

            if(productDescription.match('<p></p>')){
                setValidate(false)
                return
              }

            if (!err && productDescription !== "") {
                let formData = new FormData()
                formData.append('productNames', values.productName)
                formData.append('productQuantitys', values.productQuantity)
                formData.append('productDescriptions', productDescription)
                setLoading(true)
                try {
                    apiGatewayInstance.put('/product_create', formData, {
                        headers: {
                            authorization: props.token,
                        }
                    }).then(async (val) => {
                        setLoading(false)
                        if (imageFile !== null) {
                            await handleUpload(val.data._id)
                        }
                        Modal.success({
                            content: 'Successfully',
                            onOk() {
                                props.history.push('/productList')
                            },
                            onCancel() { },
                        });
                    }).catch(() => {
                        setLoading(false)
                        Modal.error({
                            content: 'please check productName duplicate',
                        });
                    })
                } catch (error) {
                    throw error
                   
                }
            }else{
                setValidate(false)
            }
        });
    };

    return (
        <Container>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Header title="ProductCreate" text="BACK" link="/productList" create={true} loading={loading}/>
                <Row>
                    <Col span={8} style={{ position: "relative", top: 12 }}>
                        <ImageUpload func={func} />
                    </Col>
                    <Col span={1} />

                    <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            {getFieldDecorator('productName', {
                                rules: [{ required: true, message: 'Please input your prodcutName!' }],
                            })(
                                <Input
                                    prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="ProductName"
                                    maxLength={100}
                                />,
                            )}
                        </Form.Item>
                        <Col span={10}>
                            <Form.Item>
                                {getFieldDecorator('productQuantity', {
                                    rules: [{ required: true, message: 'Please input your quantity!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="number"
                                        placeholder="Quantity"
                                        maxLength={10}
                                    />,
                                )}
                            </Form.Item>

                        </Col>
                        <Col span={14} />
                        <Col span={24}>  
                            {!validate && <TextValidate>Please input your description!</TextValidate>}
                            <TextEditor
                                onModelChange={text => setProductDescription(text)}
                            />
                        </Col>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Form.create({ name: 'productAdd' })(withRouter(ProductAdd))