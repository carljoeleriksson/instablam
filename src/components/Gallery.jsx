import React, {useState, useEffect} from 'react'
import './gallery.css'

import Image from './Image'

function Gallery() {
	const [gallery, setGallery] = useState()

/* 	console.log('gallery: ', gallery); */
	
	function galleryList(){
		console.log('gallery: ', gallery);
		return gallery.map(imgProps => (
			<Image {...imgProps} key={imgProps.id} />
		))
	}

	useEffect(() => {
		if(localStorage.gallery){
			setGallery(JSON.parse(localStorage.gallery))
		}
	}, [])

	return (
		<div id="gallery-container">
			{gallery && galleryList()}
		</div>
	)
}

export default Gallery
