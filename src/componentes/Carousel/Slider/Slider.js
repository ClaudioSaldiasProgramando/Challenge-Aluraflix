import React from 'react'
import { useState ,lazy ,Suspense , useContext } from "react";
import MyContext from '../../../Context'
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/swiper-bundle.css';
import styled, { css } from "styled-components"
// import VideoPlayer from '../VideoCard/VideoPlayer';


import VidePlayer from './VideoPlayer'





const CategoryContainer = styled.div`
  color:#ffff;
  display:flex;

  height:5rem;
  /* margin-left:0.3%; */
  align-items: center;
  & .textoCategoria {
       margin-left:1rem;
       color: #f5f5f5;
       flex:wrap;

    }
/* 
    
    
  ${props => props.isHidden && css`
    display: none;
  `} */

  @media screen and (min-width: 992px) {
    display: ${(props) =>
    props.isHidden && "none"};
  }

  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      flex-direction:column;
      align-items: flex-start;
      justify-content:space-between;
      & .textoCategoria {
       margin-left:0rem;
     

    }

      
   ` }
`;



const CategoriaTitulo = styled.div`
    display:flex;
    background-color: ${(props) => props.categoriaColor};
    width:auto;
    padding:1rem;
    height:60%;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;


    
  ${props => css`
    @media (max-width: ${props.theme.breakpoints.laptop}) {
      &:not(:first-child) {
      margin-top:3rem;
  }

    }

      
   ` }
  

`





const SwiperContainer = styled.div`
 width: 100%;
 height: 100%;
 /* -webkit-transform: scale(1.2);
          transform: scale(1.2);
  z-index: 1;
  &:hover{

-webkit-transform: scale(1.2);
      transform: scale(1.2);
z-index: 1;
 */


`

const StyledSwiper = styled(Swiper)`
  padding: 20px 0;
  /* Add your custom styles here */
/* 

  .swiper-slide {
  
    display: flex;
    justify-content: center;
    align-items: center;

  

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  } */

  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    font-size: 30px;
    width: 50px;
    height: 50px;
   // background-color: #000;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #257BE5;
      height:5rem;
      width:5rem;

    
    }
   
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }
  
`;


const StyledSwiperSlide = styled(SwiperSlide)`
  -webkit-transition: 250ms all;
  transition: 250ms all;
  cursor:pointer;
  img {
    max-width: 100%;
    height: auto;
    
  } 
  text-align: center;
    font-size: 18px;

  & .itemInfo {
    display:none;
  }  

  & .slide-container {
    
    position: relative;
  }

  .slide-container .hidden {
  display: none;
}
                  

  &:hover{

    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    z-index: 1;

    /* .itemInfo{
      display:block;
      height:auto;
      padding-bottom:1.5rem;
      -webkit-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
      box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
    }
 */

  }
  
& .videoImage {
  border: 4px solid ${props => props.borderColor};
}
   




`;





function Slider({ categorias, videos }) {



  const {handleVideoLoading ,setVideoToPlay} = useContext(MyContext) ;
  
  const filteredCategories = categorias.filter(categoria => {
    return videos.some(video => video.Categoria === categoria.categoriaNombre);
  });


  return (
    <div>


      <SwiperContainer>


        {
          filteredCategories.map((categoria) => (


            <div>

              <CategoryContainer isHidden={categoria.categoriaNombre === "Front End"}>
                <CategoriaTitulo categoriaColor={categoria.categoriaColor}>
                  {categoria.categoriaNombre}

                </CategoriaTitulo>
                <div className="textoCategoria">
                  {categoria.categoriaTexto}
                </div>


              </CategoryContainer>
              <StyledSwiper
                spaceBetween={10}
                slidesPerView={4}
                slidesPerGroup={2}
                navigation={true} modules={[Navigation]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}

                breakpoints={{
                  320: {
                    slidesPerView: 1,

                  },

                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,

                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}

              >






                {
                  videos.map((video, index) => video.Categoria === categoria.categoriaNombre && <StyledSwiperSlide key={video.id} borderColor={categoria.categoriaColor}
                  onClick={() => handleVideoLoading(video.linkVideo)}
                  >
                    <Link to={"/videoPlayer"}>
                    <div className="slide-container"    >
          
                        <img className="videoImage" src={video.linkImagenVideo} />
                    
                      

                    </div>
                    </Link>
                  </StyledSwiperSlide >)






                }





              </StyledSwiper>
            </div>

          ))}




      </SwiperContainer>





    </div>

  )
}

export default Slider