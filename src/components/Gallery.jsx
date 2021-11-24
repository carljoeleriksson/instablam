import React, {useState, useEffect, useContext} from 'react'
import './gallery.css'

import {CameraContext} from '../contexts/CameraContext.jsx'
import {ImageContext} from '../contexts/ImageContext.jsx'

import Image from './Image'

function Gallery() {
	const [gallery, setGallery] = useState()
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [imageCtx, setImageCtx] = useContext(ImageContext)
/* 	console.log('gallery: ', gallery); */
	
	function closePhoto() {
		let photo = cameraCtx.photoRef.current
		let ctx = photo.getContext('2d')

		ctx.clearRect(0, 0, photo.width, photo.height)
	}

	function galleryList() {
		return gallery.map(imgObj => (
			<Image {...imgObj} key={imgObj.id} />
		))
	}

	useEffect(() => {
		if(localStorage.gallery){
			setGallery(JSON.parse(localStorage.gallery))
		}
	}, [imageCtx])

	return (
		<div id='gallery-container'>
			
			{gallery && galleryList()}	
			<canvas className="hidden" ref={cameraCtx.photoRef}></canvas>
		</div>
	)
}

export default Gallery
