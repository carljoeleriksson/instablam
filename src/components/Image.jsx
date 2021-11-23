import React from 'react'

function Image(imgProps) {
	console.log('imgProps: ', imgProps);
	const imgUrl = imgProps.url.replace("blob:", "")
	console.log('imgUrl: ', imgUrl);
	const location = imgProps.location

	return (
		<div className="gallery-img">
			<img src={imgUrl} alt="" />
			<span className="img-location">{location}</span>
		</div>
	)
}

export default Image
