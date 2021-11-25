import React from 'react'

function Image(imgObj) {
	/* console.log('imgProps: ', imgObj); */
	const imgUrl = imgObj.url
	/* console.log('imgUrl: ', imgUrl); */
	const location = imgObj.location
	const time = imgObj.time

	return (
		<div className="gallery-item">
			<img src={imgUrl} alt="" />
			<div className="img-details">
				<span className="detail-item img-location">{location}</span>
				<span className="detail-item">  |  </span>
				<span className="detail-item img-time">{time}</span>
			</div>
			
		</div>
	)
}

export default Image
