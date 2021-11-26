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
	function galleryList() {
		return gallery.map(imgObj => (
			<Image {...imgObj} key={imgObj.id} />
		))
		
	}

	useEffect(() => {
		if(localStorage.gallery){
			setGallery(JSON.parse(localStorage.gallery))
		} else {
			const defaultGallery = [
				{
						id: 1,
						url: 'img/default-img_1.jpg',
						time: '20:01',
						location: 'Reichenberger Straße, Berlin'
				},
				{
						id: 2,
						url: 'img/default-img_2.jpg',
						time: '10:31',
						location: 'Ocean Ave, Los Angeles'
				}
			]

			localStorage.gallery = JSON.stringify(defaultGallery)
			setGallery(JSON.parse(localStorage.gallery))
			console.log('gallery: w defaultGallery', gallery);
			setImageCtx(gallery); //a state used only to make the Gallery.jsx update properly
		}
	}, [imageCtx])

	return (
		<div id='gallery-container'>
			{gallery && galleryList()}	
		</div>
	)
}

export default Gallery
