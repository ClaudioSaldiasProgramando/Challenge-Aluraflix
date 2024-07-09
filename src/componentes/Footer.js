import React from 'react'
import styled, { css } from "styled-components"
import logo from '../assets/LogoMain.png'


const FooterContainer = styled.div`
    background-color: #000000;
    font-size: 32px;
    color: white;
    height: 15vh;
    display:flex;
    align-items: top;
    justify-content:center;
    min-width:320px;
    border-top: 2px solid #2A7AE4;
    padding-top:1rem;
   
    
`

const Logo = styled.img`
    height:3rem;
    margin-left:2%;
    
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      margin: 0 auto;
      
   ` }

   
`


function Footer() {
  return (
    <FooterContainer>
    <Logo src={logo} alt="Aluraflix Logo" /> 

    </FooterContainer>
  )
}

export default Footer