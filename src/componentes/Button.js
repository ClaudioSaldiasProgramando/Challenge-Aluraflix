import React from 'react'
import styled , {css}from "styled-components"

const Button = styled.button`
display: inline-block;
color: ${props => props.inputColor };
background-color: ${props => props.backgroundColor || "transparent"};
width: ${props => props.btnwidth || 'auto'};
height: ${props => props.height || 'auto'};

font-size:${props=> props.fontSize};
//font-size: 1rem;
font-family: 'Source Sans Pro', sans-serif;

margin-right: ${props => props.marginR  || '0'};
margin-left: ${props=>props.ml || '0'};
//padding: 0.7rem 2.3rem;
border: 2px solid ${props =>props.bordercolor};
border-radius: 3px;
display: block;

${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      display:${props=> props.display};
      
   ` }


`;

export default Button

// export default ({children}) => {





//   return (
//     <ButtonStyles>{children}</ButtonStyles>
//   )
// }

