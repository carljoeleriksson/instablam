import React from 'react';
import './App.css';

import Camera from './components/Camera'
import MessageElem from './components/MessageElem'
import Gallery from './components/Gallery'

import CameraContextProvider from './contexts/CameraContext';
import GeoLocContextProvider from './contexts/GeoLocContext';
import ImageContextProvider from './contexts/ImageContext';

function App() {
  return (
    <CameraContextProvider>
    <GeoLocContextProvider>
    <ImageContextProvider>
      <header>
        <h1>Instablam</h1>
        <hr></hr>
      </header>
      
      <main>
        
        <Camera />
        <MessageElem />
        <hr className="section-break"></hr>
        <Gallery />
      </main>
      <footer>
        <span id="copyright">Instablam &copy;</span>
        <br/>
        <span>Web by Joel Eriksson</span>
      </footer>
    </ImageContextProvider>
    </GeoLocContextProvider>
    </CameraContextProvider>
  )
}

export default App;
