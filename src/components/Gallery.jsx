import React, {useState, useEffect, useContext} from 'react'
import './gallery.css'

import Image from './Image'
import {ImageContext} from '../contexts/ImageContext.jsx'

function Gallery() {
	const [gallery, setGallery] = useState()
	const [imageCtx, updateImageCtx] = useContext(ImageContext)

/* 	console.log('gallery: ', gallery); */
	
	function galleryList(){
		console.log('gallery: ', gallery);
		return gallery.map(e => (
			<Image key={imageCtx.id} />
		))
	}


	return (
		<div id="gallery-container">
			{imageCtx && galleryList()}
		</div>
	)
}

export default Gallery
