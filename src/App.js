import React from 'react';
import './App.css';

import Camera from './components/Camera'
import Gallery from './components/Gallery'

import CameraContextProvider from './contexts/CameraContext';
import GeoLocContextProvider from './contexts/GeoLocContext';

function App() {
  return (
    <CameraContextProvider>
    <GeoLocContextProvider>
      <header>
        <h1>Instablam</h1>
        <hr></hr>
      </header>
      
      <main>
        
        <Camera></Camera>
        <hr className="section-break"></hr>
        <Gallery />
      </main>
    </GeoLocContextProvider>
    </CameraContextProvider>
  )
}

export default App;
