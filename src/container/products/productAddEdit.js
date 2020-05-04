/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Header, ImageUpload, TextEditor,TextValidate } from '../../components'
import { Container } from '../../components/style'
import { Form, Icon, Input, Row, Col, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/action'

const ProductAddEdit = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [validate, setValidate] = useState(true)
    const [initData, setInit] = useState(false)
    const idParam = props.match.params.id
    const { 
        save, 
        loading,
        uploadImage,
        productEditGet,
        loadingEdit,
        productEdit
    } = props
    const { getFieldDecorator } = props.form;

    const func = {
        imageFile: (val) => setImageFile(val)
    }

    const handleUpload = async (_id) => {
        let formData = new FormData()
        formData.append('imagePath', imageFile)
        formData.append('_id', _id)
        try {
            const saveData = await uploadImage(formData)
            if(saveData) {
                return true
            } else{
                Modal.error({
                    content: 'please check imageFile',
                });
            }
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if(productDescription.match('<p></p>')){
                setValidate(false)
                return
            }

            if (!err && productDescription !== "") {
                if(idParam){
                    let formData = new FormData()
                    formData.append('productNames', values.productName)
                    formData.append('productQuantitys', values.productQuantity)
                    formData.append('productDescriptions', productDescription)
                    formData.append('imagePath', initData.imagePath)
                    formData.append('_id', props.match.params.id)
                    try {
                        const saveData =  await productEdit(formData)
                        if (imageFile !== null && !!saveData.id) {
                            await handleUpload(saveData.id)
                        }
                        if(saveData) {
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            Modal.error({
                                content: 'please check productName duplicate',
                            });
                        }
                    } catch (error) {
                        throw error
    
                    }
                }else{
                    let formData = new FormData()
                    formData.append('productNames', values.productName)
                    formData.append('productQuantitys', values.productQuantity)
                    formData.append('productDescriptions', productDescription)
                    try {
                        const saveData =  await save(formData)
                        if (imageFile !== null && !!saveData.id) {
                            handleUpload(saveData.id)
                        }
                        if(saveData) {
                            Modal.success({
                                content: 'Successfully',
                                onOk() {
                                    props.history.push('/products/productList')
                                },
                                onCancel() { },
                            });
                        } else{
                            Modal.error({
                                content: 'please check productName duplicate',
                            });
                        }
                    } catch (error) {
                        throw error
                    }
                }
            }else{
                setValidate(false)
            }
        });
    };

    useEffect(() => {
        if(idParam && initData === false){
            productEditGet(idParam).then(val => {
                setInit(val)
                setProductDescription(val.productDescription)
            })
            setValidate(true)
        }
    }, [initData])

    return (
        <Container>
            {loadingEdit && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {
                !loadingEdit &&  <Form className="login-form" onSubmit={handleSubmit}>
                <Header title={initData ? "ProductEdit " + initData.productName : "ProductCreate"} text="BACK" link="/products/productList" create={true} loading={loading}/>
                <Row>
                    <Col span={8} style={{ position: "relative", top: 12 }}>
                      <ImageUpload func={func} imagePath={initData ? imageFile ? null: initData.imagePath : null }/>
                    </Col>
                    <Col span={1} />

                    <Col span={15} style={{ position: "relative", top: 15 }}>
                        <Form.Item>
                            {getFieldDecorator('productName', {
                                rules: [{ required: true, message: 'Please input your prodcutName!' }],
                                initialValue: initData ? initData.productName: null
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
                                    initialValue: initData ? initData.productQuantity: null
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
                            {idParam && initData &&
                                <TextEditor
                                   description={initData.productDescription}
                                   onModelChange={text => setProductDescription(text)}
                               />
                            }
                            {!idParam &&
                                <TextEditor
                                   onModelChange={text => setProductDescription(text)}
                               />
                            }
                        </Col>
                    </Col>
                </Row>
            </Form>
            }
           
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.product.loading,
        loadingEdit: state.product.loadingEdit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (params) => dispatch(actions.productAddAsync(params)),
        uploadImage: (params) => dispatch(actions.productAddImage(params)),
        productEditGet: (params) => dispatch(actions.getProductEditData(params)),
        productEdit: (params) => dispatch(actions.productEditAsync(params))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'productAdd' })(withRouter(ProductAddEdit)))