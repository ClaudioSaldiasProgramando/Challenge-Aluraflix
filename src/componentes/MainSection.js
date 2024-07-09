import React , { useState, useEffect }  from 'react'
import Slider from './Carousel/Slider/Slider'

import Banner from '../componentes/Banner'
import styled , {css} from "styled-components"





const MainSectionContainer = styled.div`
    background-color: #191919;

    padding:2rem;
    ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      padding-top:1.5rem;
      
   ` }

    
`







function MainSection({categorias , videos}) {


  return (
    <>
    <Banner/>
    <MainSectionContainer>
         
          <Slider categorias={categorias } videos={videos}/>
  
    </MainSectionContainer>

    </>

  )
}

export default MainSection