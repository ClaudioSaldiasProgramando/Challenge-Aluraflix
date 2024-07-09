import './styles/reset.css'

import theme  from './styles/theme'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Banner from '../src/componentes/Banner';
import Slider from './componentes/Carousel/Slider/Slider';
import Footer from './componentes/Footer'
import MainSection from './componentes/MainSection';
import React, { useState, useEffect , useReducer } from 'react';
import axios from 'axios';
import { createBrowserRouter,  Route,  createRoutesFromElements, RouterProvider  } from 'react-router-dom';
import MyContext from '../src/Context'
import VideoPlayer from './componentes/Carousel/Slider/VideoPlayer';
import  FormularioCategoria from './componentes/FormularioCategoria'
import FormularioVideos from './componentes/FormularioVideos';
import { SnackbarProvider } from "notistack";
//layouts
import RootLayout from './layouts/RootLayout';



function App() {
 
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  // const [showFullPage, setShowFullPage] = useState(false);
  const [videoToPlay,setVideoToPlay] = useState();

  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    axios.get('http://localhost:3001/categorias')
      .then(response => setCategorias(response.data))
      .catch(error => console.error(error));
  }, [reducerValue]);

  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error(error));
  }, [reducerValue]);




  const handleVideoLoading = (videoUrl) => {

    console.log(videoUrl)
    setVideoToPlay(videoUrl);
    // setShowFullPage(true);
    

  };

  // const handleFullPageClose = () => {
  //   setShowFullPage(false);
  // };

 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
        

    {/* <Route path="/formulariovideos" component={FormularioVideos}/> */}
    <Route index element={<MainSection categorias={categorias} videos={videos} />} />
    {/* <Route exact path="/" element={() => <MainSection categorias={categorias} videos={videos} />} /> */}
    <Route path="/formulariovideos" element={<FormularioVideos/>} />
     
     <Route path="/videoPlayer" element={<VideoPlayer/>}/>

     <Route path="/formulariocategoria" element={<FormularioCategoria/>}/>
     
    </Route>
    
  )
 )
  return (
    
    <ThemeProvider theme={theme}>
        <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}>
    <main >
      <MyContext.Provider  value={{handleVideoLoading,setVideoToPlay , videoToPlay , forceUpdate }}>
      
      {/* {!showFullPage&&<Banner/>}
      {showFullPage ? (<VideoPlayer/>) : (
        
        
        
        // <MainSection categorias = {categorias}  videos = {videos}/>)}

       
        
      )} */}
      <RouterProvider router={router}/>


      <Footer/>
      </MyContext.Provider>
    
    </main>
    </SnackbarProvider>
    </ThemeProvider>
    
  );
















}

export default App;
