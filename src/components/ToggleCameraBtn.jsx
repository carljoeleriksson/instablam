import React, { useContext } from 'react'

import camActivateIcon from '../assets/svg/cam-activate-icon.svg'
import camDeactivateIcon from '../assets/svg/cam-deactivate-icon.svg'

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

		if( !cameraCtx.stream )
		return;

		// Hämta alla spår från kameraströmmen och avsluta dem var och en
		let tracks = cameraCtx.stream.getTracks()
		tracks.forEach(track => track.stop())
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

	return (<>
			<button id="toggle-cam-btn" className={"icon-btn" + (!cameraCtx.cameraIsOn ? " " + 'cam-activate-btn' : "")} onClick={handleCamToggle}>
				{cameraCtx.cameraIsOn ? 
					<img src={camDeactivateIcon} alt="Turn camera off" />
				:
					<img id="cam-activate-icon" src={camActivateIcon} alt="Turn camera on" />
				}
			</button>
			</>
	)
}





export default ToggleCameraBtn
