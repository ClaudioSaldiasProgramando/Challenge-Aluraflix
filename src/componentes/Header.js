import React from 'react';
import { useNavigate  } from 'react-router-dom';
import styled, { css } from "styled-components"
import logo from '../assets/LogoMain.png'
import Button from '../componentes/Button'



const HeaderContainer = styled.div`
    background-color: #000000;
    font-size: 32px;
    color: white;
    height: 5rem;
    display:flex;
    align-items: center;
    justify-content:space-between;
    min-width:320px;
    border-bottom: 2px solid #2A7AE4;
    
`
const Logo = styled.img`
    max-height:40%;
    margin-left:2%;

    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      margin: 0 auto;
      
   ` }

   
`

const Header = () => {
  const navigate = useNavigate();
  const volverMain = () =>{

   
navigate('/');

}

  function handleClick() {
    console.log("nada")
    navigate('/formulariovideos');
  }

  return (
    <HeaderContainer>
      <Logo src={logo} onClick={volverMain} alt="Aluraflix Logo" />
 
      <Button onClick={handleClick}   inputColor="white" bordercolor='white' marginR="2%" display='none' fontSize="1rem" btnwidth="8rem" height="3rem"  >
        Nuevo Video
      </Button>
  
    </HeaderContainer>
  )
}

export default Header