import React from 'react';
import styled from 'styled-components'

const Font = styled.span`
    font-size:18px;
    font-weight:bold;
`

const Title = ({ children }) => (
    <Font>{children}</Font>
);

export default Title
