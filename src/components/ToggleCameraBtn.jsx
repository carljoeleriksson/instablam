import React, { useContext } from 'react'

import camActivateIcon from '../assets/cam-activate-icon.png'
import camDeactivateIcon from '../assets/cam-deactivate-icon.png'

import {CameraContext} from '../contexts/CameraContext.jsx'



function ToggleCameraBtn() {
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	
	

	const handleCamToggle = () => {
		if(cameraCtx.cameraIsOn) {
			cameraOff()
		} else {
			cameraOn()
		}
	}

	async function cameraOff(){
		const videoElem = cameraCtx.videoRef.current
		updateCameraCtx({cameraIsOn: false})
		videoElem.srcObject = null
	}
	
	async function cameraOn() {
		const videoElem = cameraCtx.videoRef.current
		const constraints = {
			video: {
				facingMode: 'user'
			}
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			console.log("stream: ", stream);
			videoElem.srcObject = stream
			videoElem.addEventListener('loadedmetadata', () => {
				videoElem.play();
				updateCameraCtx({
					cameraIsOn: true, 
					stream: stream
				})
			})
		} catch (error) {
			console.log('Could not use camera: ', error.message);
			updateCameraCtx({statusMessage: 'Sorry, could not use your camera.</br>Did you give permission?'})
		}
	}

	return (
		<div>
			<button id="toggle-cam-btn" className="icon-btn" onClick={handleCamToggle}>
				{cameraCtx.cameraIsOn ? 
					<img src={camDeactivateIcon} alt="Turn camera off" />
				:
					<img src={camActivateIcon} alt="Turn camera on" />
				}
			</button>
		</div>
	)
}





export default ToggleCameraBtn
