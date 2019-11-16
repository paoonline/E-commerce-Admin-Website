import styled from 'styled-components'
import { Avatar,Input } from 'antd';

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