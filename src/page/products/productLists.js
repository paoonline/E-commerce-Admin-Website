import React, { useEffect, useState } from 'react';
import { Header, Table } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { apiGatewayInstance } from '../../util/axiosInstance'
import { Icon, Alert } from 'antd';

const ProductList = (props) => {
    const [loading, setLoading] = useState(false)
    const [initData, setInitData] = useState([])
    const [status, setStatus] = useState("")
    let timeout;
    let unmounted = false;
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
                            authorization: props.token,
                        }
                    }).then((val) => {
                        val.data && setInitData([val.data])
                    })
                } catch (error) {
                    throw error
                }
            }, 500)
        }else{
            initHandle()
        }
    }

    const handleDelete = (_id) => {
        try {
            apiGatewayInstance.delete(`/product_delete?_id=${_id}`, {
                headers: {
                    authorization: props.token,
                }
            }).then(async () => {
                const newData = await initData.filter(val => val._id !== _id)
                setInitData(newData)
                setStatus(true)
            })
        } catch (error) {
            setStatus(false)
        }
    }

    const initHandle = () => {
        try {
            apiGatewayInstance.get('/product_list', {
                headers: {
                    authorization: props.token,
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
    }

    useEffect(() => {
        setLoading(true);
        initHandle()
        return () => { unmounted = true };
    }, [props]);

    return (
        <Container>
            <Header title="ProductList" text="CREATE" link="/products/productAdd" />
            <hr />
            <Flex>
                <div style={{ marginLeft: '5rem' }} />
                {status && <Alert  style={{height:40}} message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}
                <NewInput placeholder="Search productName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {!loading && initData.length > 0 ?
                <Table data={initData} func={{
                    delete: (id) => handleDelete(id),
                }} /> : !loading && 'ไม่มีข้อมูล'
            }
        </Container>
    )
}

export default ProductList