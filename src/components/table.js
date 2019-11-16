import React from 'react'
import { Table, Avatar } from 'antd';
import { Modal } from '../components'
import config from '../util/config'
import { Link } from 'react-router-dom'

const TableList = (props) => {
    const { func } = props
    const columns = [
        {
            title: 'no.',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'productImage',
            dataIndex: 'imagePath',
            key: 'imagePath',
        },
        {
            title: 'productName',
            dataIndex: 'productName',
            key: 'productName',
        },

        {
            title: 'productQuantity',
            dataIndex: 'productQuantity',
            key: 'productQuantity',
        },
        {
            title: 'productModify',
            dataIndex: 'productModify',
            key: 'productModify',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        },
    ];

    const data = props.data.map((val, i) => {
        return {
            key: i + '_' + val.productName,
            no: i,
            productName: val.productName,
            productQuantity: val.productQuantity,
            productModify: new Date(new Date(val.productModify)).toDateString(),
            imagePath: <Avatar src={config.service + "/images/" + val.imagePath} />,
            edit: <Link to={`/products/productEdit?id=${val._id}`}><Modal icon="edit" /></Link>,
            delete: <Modal icon="delete" funcs={() =>
                func.delete(val._id)}
            />
        }

    })
    return <Table columns={columns} dataSource={data} />
}

export default TableList