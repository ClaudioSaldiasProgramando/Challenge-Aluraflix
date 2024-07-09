import React, { useState, useContext  } from 'react';
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import MyContext from '../../../Context';

import Fab from '@mui/material/Fab';






const VideoContainer = styled.div`
  width: auto;
  height: 80vh;
  
  position:relative;
  background-color:#191919;
  padding-top:1rem;
 
  
`;



const StyledPlayer = styled(ReactPlayer)`
   position:relative;


  
  
`;

const PlayerWrapper = styled.div`
    display:flex;
    flex-direction:column;
    max-width:60%;
    height:60vh;
    margin: 0 20%;
    
    & .boton {
      align-self:flex-end;
      padding:0.5rem;
      font-size:1.3rem;
      margin-bottom:0.5rem;
    }
    & .spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      

    }
  
    opacity: ${(props) => (props.loading ? 0 : 1)};
    transition: opacity 0.9s ease-in-out;

    
`



const VideoPlayer = ({ videoUrl }) => {
  const navigate = useNavigate();
  const { videoToPlay } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const volverMain = () =>{

   
    navigate('/');

  }
  function handleReady() {
  
    setLoading(false);
  }



  return (
    <VideoContainer>
   
      <PlayerWrapper loading={loading}>

   
      
         {/* {loading && (
                <div className="spinner">
                  <PuffLoader color="#123abc" loading={loading} />
                </div>
              )} */}

          

            <Fab color="primary" aria-label="add" className="boton" onClick={ () => volverMain()}>
              X
            </Fab>
            <StyledPlayer url={videoToPlay}
              width="100%" height="100%" onReady={handleReady}


            />
        


      </PlayerWrapper>
    </VideoContainer>
  );
};




export default VideoPlayer