import React from 'react';
import './App.css';

import Camera from './components/Camera'
import Gallery from './components/Gallery'

import CameraContextProvider from './contexts/CameraContext';

function App() {
  return (
    <CameraContextProvider>
      <header>
        <h1>Instablam</h1>
        <hr></hr>
      </header>
      
      <main>
        
        <Camera></Camera>
        <hr className="section-break"></hr>
        <Gallery />
      </main>
    </CameraContextProvider>
  )
}

export default App;
