import React from 'react'

function Image(imgObj) {
	console.log('imgProps: ', imgObj);
	const imgUrl = imgObj.url
	console.log('imgUrl: ', imgUrl);
	const location = imgObj.location

	return (
		<div className="gallery-item">
			<img src={imgUrl} alt="" />
			<span className="img-location">{location}</span>
		</div>
	)
}

export default Image
