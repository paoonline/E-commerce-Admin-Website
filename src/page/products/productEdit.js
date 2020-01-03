import React, { useState, useEffect } from 'react'
import { Header, ImageUpload, TextEditor, TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { apiGatewayInstance } from '../../util/axiosInstance'
import { withRouter } from 'react-router-dom'

const getToken = localStorage.getItem("token")
const ProductEdit = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [validate, setValidate] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [initData, setInitData] = useState(false)
    const [init, setInit] = useState({
        productName: null,
        productQuantity: 0,
        imagePath: null
    })

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
                    authorization: getToken,
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

            if (productDescription.match('<p></p>')) {
                setValidate(false)
                return
            }

            if (!err && productDescription !== "") {
                let formData = new FormData()
                formData.append('productNames', values.productName)
                formData.append('productQuantitys', values.productQuantity)
                formData.append('productDescriptions', productDescription)
                formData.append('imagePath', init.imagePath)
                formData.append('_id', props.match.params.id)
                setLoadingSave(true)
                try {
                    apiGatewayInstance.post('/product_update', formData, {
                        headers: {
                            authorization: getToken,
                        }
                    }).then(async (val) => {
                        setLoadingSave(false)
                        if (imageFile !== null) {
                            await handleUpload(val.data._id)
                        }
                        Modal.success({
                            content: 'Successfully',
                            onOk() {
                                props.history.push('/products/productList')
                            },
                            onCancel() { },
                        });
                    }).catch(() => {
                        setLoadingSave(false)
                        Modal.error({
                            content: 'please check productName duplicate',
                        });
                    })
                } catch (error) {
                    throw error

                }
            } else {
                setValidate(false)
            }
        });
    };


    useEffect(() => {
        let unmounted = false;
        if (initData === false) {
            setLoading(true);
            setInitData(true)
            try {
                apiGatewayInstance.get(`/product_editone?_id=${props.match.params.id}`, {
                    headers: {
                        authorization: getToken,
                    }
                }).then((res) => {
                    setLoading(false);
                    const { productName, productDescription, productQuantity, imagePath } = res.data
                    setProductDescription(productDescription)
                    setInit({
                        productName: productName,
                        productQuantity: productQuantity,
                        imagePath: imagePath
                    })
                })
            } catch (error) {
                if (!unmounted) {
                    setLoading(false);
                    throw error
                }
            }
        }
        return () => { unmounted = true };
    }, [props,initData])

    return (
        <Container>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {!loading && init.productName &&
                <Form className="login-form" onSubmit={handleSubmit}>
                    <Header title="ProductEdit" text="BACK" link="/products/productList" create={true} loading={loadingSave} />
                    <Row>
                        <Col span={8} style={{ position: "relative", top: 12 }}>
                            <ImageUpload func={func} imagePath={init.imagePath} />
                        </Col>
                        <Col span={1} />

                        <Col span={15} style={{ position: "relative", top: 15 }}>
                            <Form.Item>
                                {getFieldDecorator('productName', {
                                    rules: [{ required: true, message: 'Please input your prodcutName!' }],
                                    initialValue: init.productName
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
                                        initialValue: init.productQuantity
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
                                {!validate && productDescription.match('<p></p>') && <TextValidate>Please input your description!</TextValidate>}
                                <TextEditor
                                    description={productDescription}
                                    onModelChange={text => setProductDescription(text)}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Form>
            }
        </Container>
    )
}

export default Form.create({ name: 'productEdit' })(withRouter(ProductEdit))