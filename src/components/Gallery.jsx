import React, {useState, useEffect, useContext} from 'react'
import './gallery.css'

import {CameraContext} from '../contexts/CameraContext.jsx'

import Image from './Image'

function Gallery() {
	const [gallery, setGallery] = useState()
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
/* 	console.log('gallery: ', gallery); */
	
	function closePhoto() {
		let photo = cameraCtx.photoRef.current
		let ctx = photo.getContext('2d')

		ctx.clearRect(0, 0, photo.width, photo.height)
	}

useEffect(() => {
	
}, [])

	return (
		<div id='gallery-container'>
			<canvas ref={cameraCtx.photoRef}></canvas>
			<button onClick={closePhoto}>X</button>
		</div>
	)
}

export default Gallery
