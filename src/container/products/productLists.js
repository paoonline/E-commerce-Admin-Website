import React, { useEffect } from 'react';
import { Header, Table } from '../../components'
import { Container, NewInput, Flex } from '../../components/style'
import { Icon } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../../store/action'
import { MarginLeft, AlertStyle } from '../../components/style'

const ProductList = (props) => {
    const { 
        list, 
        dataList,
        listDelete,
        listSearch
    } = props
    const { loading, status } = dataList
    let timeout;

    const handleSearch = (e) => {
        const text = e.target.value

        if (timeout !== null) {
            clearTimeout(timeout)
        }
        if (e.target.value) {
            timeout = setTimeout(() => {
                listSearch(text)
            }, 500)
        } else {
            list()
        }
    }

    const handleDelete = async (_id) => {
        const list = await dataList.list.filter(val => val._id !== _id)
        listDelete(_id, list)
    }

    useEffect(() => {
        list()
    }, [list]);

    return (
        <Container>
            <Header title="ProductList" text="CREATE" link="/products/productAdd" />
            <Flex style={{ justifyContent: !loading && dataList.list.length <= 0 ? "center" : "space-between" }}>
                <MarginLeft/>
                {status && <AlertStyle message={status ? "Successfully" : "Fail"} type={status ? "success" : "error"} />}
                {dataList.list.length > 0 && <NewInput style={{ marginRight: 10 }} placeholder="Search productName" suffix={<Icon type="search" className="certain-category-icon" />} onChange={handleSearch} />}
            </Flex>
            {loading && <Icon type="loading" style={{ fontSize: '100px' }} />}
            {(!loading && dataList.list.length > 0 ) ?
                <Table className="listProduct" data={dataList.list} func={{
                    delete: (id) => handleDelete(id),
                }} /> : !loading && 'No data'
            }
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        dataList: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        list: () => dispatch(actions.productFetch()),
        listDelete: (params, list) => dispatch(actions.productDelete(params, list)),
        listSearch: (text) => dispatch(actions.productSearch(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)