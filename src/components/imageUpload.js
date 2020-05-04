import React, { useState, useEffect } from 'react'
import { Upload, Icon, message } from 'antd';
import { ImageUploadFile } from '../components/style'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const ImageUpload = (props) => {
    const { imageFile } = props.func
    const [state = { loading: false }, setState] = useState(false)
    const { imageUrl } = state;
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            imageFile(info.file.originFileObj)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    const uploadButton = (
        <div>
            <ImageUploadFile src={"/images/default-image.jpg"} alt="avatar" />
            <Icon type={state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    useEffect(()=>{
        if (props.imagePath && imageUrl === undefined) {
            setState({
                imageUrl: props.imagePath
            })
        }
    },[props,imageUrl])

    return (
        <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <ImageUploadFile src={imageUrl} /> : uploadButton}
        </Upload>
    );
}

export default ImageUpload