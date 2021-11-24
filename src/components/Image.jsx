import React, {useEffect, useContext} from 'react'

import {ImageContext} from '../contexts/ImageContext.jsx'

function Image() {
	const [imageCtx, updateImageCtx] = useContext(ImageContext)

	console.log('imgCtx: ', imageCtx);
	const imgUrl = imageCtx.url
//	const blob = imgProps.url
	//const imgUrl = URL.createObjectURL(blob);
	console.log('imgUrl: ', imgUrl);
	const location = imageCtx.location

	return (
		<div className="gallery-img">
			<img src={imgUrl} alt="" />
			<span className="img-location">{location}</span>
		</div>
	)
}

export default Image
