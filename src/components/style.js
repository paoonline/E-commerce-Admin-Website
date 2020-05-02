import styled from 'styled-components'
import { Avatar, Input, Alert } from 'antd';

export const FontRed = styled.span`
    color:red
`

export const NewAvatar = styled(Avatar)`
    cursor:pointer
`

export const FontTitle = styled.span`
    font-size:18px;
    font-weight:bold;
`

export const Container = styled.div`
    overflow:auto;
    height:100%;
    text-align:center;
`

export const NewInput = styled(Input)`
    width: 20%; 
    float: right;
    margin-top:10px; 
    margin-bottom:10px
`

export const Flex = styled.div`
    display:flex;
    justify-content:space-between
`

export const MarginStyle = styled.div`
    margin-top:7px;
    margin-left:${props => props.left ? 20 : 0}
`

export const ImageUploadFile = styled.img`
    max-width:300px;
    height: 300px;
    display:flex;
    width:100%;
`

export const FlexLogin = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    flex-direction:column;
`

export const MarginLeft = styled.div`
    margin-left: 5rem
`

export const AlertStyle = styled(Alert)`
    height: 40px;
    justify-content: center
`