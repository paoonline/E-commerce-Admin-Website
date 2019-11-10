import React from 'react';
import styled from 'styled-components'

const Font = styled.span`
    color:red
`

const Textvalidate = ({ children }) => (
    <Font>{children}</Font>
);

export default Textvalidate