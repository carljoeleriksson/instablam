import React, {useState, useContext} from 'react'

import './messageElem.css'

import {CameraContext} from '../contexts/CameraContext.jsx'
import {ImageContext} from '../contexts/ImageContext.jsx'
import {GeoLocContext} from '../contexts/GeoLocContext.jsx'

function MessageElem() {
	const [message, setMessage] = useState();

	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [geoLocCtx, updateGeoLocCtx] = useContext(GeoLocContext)
	const [imageCtx, setImageCtx] = useContext(ImageContext)

	

	return (
		<div id="message-elem">
			{cameraCtx.cameraIsOn ? <span>Camera working</span> : null}
			{geoLocCtx.status !== '' ? <span>{geoLocCtx.status}</span> : null}
			{cameraCtx.selfTimerOn ? <span>Self-timer on</span> : null}
		</div>
		
	)
}

export default MessageElem
