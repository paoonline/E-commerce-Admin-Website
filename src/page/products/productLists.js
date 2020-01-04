import React, { useEffect, useState } from 'react';
import { Header, Table } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { apiGatewayInstance } from '../../util/axiosInstance'
import { Icon, Alert } from 'antd';

const getToken = localStorage.getItem("token")
const ProductList = (props) => {
    const [loading, setLoading] = useState(false)
    const [initData, setInitData] = useState([])
    const [status, setStatus] = useState("")
    const {test, tableNodata, dataTest} = props;
    let timeout;

    const handleSearch = (e) => {
        const value = e.target.value

        if (timeout !== null) {
            clearTimeout(timeout)
        }
        if (e.target.value) {
            timeout = setTimeout(() => {
                try {
                    apiGatewayInstance.get(`/product_search?productName=${value}`, {
                        headers: {
                            authorization: getToken,
                        }
                    }).then((val) => {
                        val.data.length > 0 && setInitData(val.data)
                        return
                    })
                } catch (error) {
                    throw error
                }
            }, 500)
        } else {
            initHandle()
        }
    }

    const handleDelete = (_id) => {
        try {
            apiGatewayInstance.delete(`/product_delete?_id=${_id}`, {
                headers: {
                    authorization: getToken
                }
            }).then(async () => {
                const newData = await initData.filter(val => val._id !== _id)
                setInitData(newData)
                setStatus(true)
            }).catch(() => {
                setStatus(false)
            })
        } catch (error) {
            setStatus(false)
        }
    }

    const initHandle = () => {
        try {
            apiGatewayInstance.get('/product_list', {
                headers: {
                    authorization: getToken,
                },
            }).then(async (val) => {
                setInitData(val.data)
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
            throw error
        }
    }

    useEffect(() => {
        let unmounted = false;
        setLoading(true);

        // for test
        if(test){
            setInitData(dataTest)
            return
        }

        try {
            apiGatewayInstance.get('/product_list', {
                headers: {
                    authorization: getToken,
                },
            }).then(async (val) => {
                if (!unmounted) {
                    setInitData(val.data)
                    setLoading(false);
                }
            })
        } catch (error) {
            if (!unmounted) {
                setLoading(false);
                throw error
            }
        }
        return () => { unmounted = true };
    }, [props, test, dataTest]);

    return (
        <Container>
            <Header title="ProductList" text="CREATE" link="/products/productAdd" />
            <Flex style={{ justifyContent: !loading && initData.length <= 0 ? "center" : "space-between" }}>
                <div style={{ marginLeft: '5rem' }} />
                {status && <Alert style={{ height: 40, justifyContent:"center" }} message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}
                {initData.length > 0 && <NewInput style={{ marginRight: 10 }} placeholder="Search productName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />}
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {(!loading && initData.length > 0 &&  tableNodata === undefined )|| (test && tableNodata === undefined ) ?
                <Table className="listProduct" data={initData} func={{
                    delete: (id) => handleDelete(id),
                }} /> : !loading && 'No data'
            }
        </Container>
    )
}

export default ProductList