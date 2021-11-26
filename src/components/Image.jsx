import React, {useState, useEffect, useContext} from 'react'

import trashIcon from '../assets/svg/trash-icon.svg'
import downloadIcon from '../assets/svg/download-icon.svg'

import {ImageContext} from '../contexts/ImageContext.jsx'

function Image(imgObj) {
	const [gallery, setGallery] = useState()
	const [imageCtx, setImageCtx] = useContext(ImageContext)	

	useEffect(() => {
		if(localStorage.gallery){
			setGallery(JSON.parse(localStorage.gallery))
		}
	}, [imageCtx])


	/* console.log('imgProps: ', imgObj); */
	const imgUrl = imgObj.url
	/* console.log('imgUrl: ', imgUrl); */
	const location = imgObj.location
	const time = imgObj.time


function deletePhoto() {
	const galleryArr = gallery
	console.log('galleryArr pre: ', galleryArr);
	let imgIndex = galleryArr.map(e => {
		return e.id;
	  }).indexOf(imgObj.id);
	  
	  galleryArr.splice(imgIndex, 1);
	  console.log('galleryArr post: ', galleryArr);

	localStorage.removeItem('gallery')
	localStorage.gallery = JSON.stringify(gallery)
	setImageCtx(gallery); 
}

	return (
		<div className="gallery-item">
			<img className="gallery-img" src={imgUrl} alt="" />
			<div className="img-details">
				<div className="detail-text">
					<span className="detail-item img-location">{location}</span>
					<span className="detail-item">  |  </span>
					<span className="detail-item img-time">{time}</span>
				</div>
				<div className="detail-btns">
					<a href={imgUrl} download="img"><img className="icon-img" src={downloadIcon} alt="Download" /></a>
					<button className="icon-btn" onClick={deletePhoto}><img src={trashIcon} alt="Delete" /></button>
				</div>
			</div>
		</div>
	)
}

export default Image
