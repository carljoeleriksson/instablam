import { useState, useEffect, useContext } from "react";
import './camera.css'

import { CameraContext } from '../contexts/CameraContext'



import timerActiveIcon from '../assets/svg/timer-active-icon.svg'
import timerIcon from '../assets/svg/timer-icon.svg'

import ToggleCameraBtn from "./ToggleCameraBtn";
import CaptureBtn from "./CaptureBtn";
import GeoLocBtn from "./GeoLocBtn";

const Camera = () => {
	const [canUseMd, setCanUseMd] = useState(false)

	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [timerIsOn, setTimerIsOn] = useState(false)


	console.log('cameraCtx: ', cameraCtx);

	useEffect(() => {
		//Denna useEffect körs en gång, när komponenten mountas
		setCanUseMd('mediaDevices' in navigator)
	}, [])

	function toggleSelfTimer(){
		if(!cameraCtx.selfTimerOn){
			updateCameraCtx({selfTimerOn: true})
		} else {
			updateCameraCtx({selfTimerOn: false})
		}
	}

	return (
		<div id="cam-container">
			{cameraCtx.selfTimerOn ? <span id="self-timer-elem">{cameraCtx.selfTimerSec}</span> : null}
			<div className="cam-elem">
				{!cameraCtx.cameraIsOn ? <ToggleCameraBtn /> : null}				
				{canUseMd ? <video ref={cameraCtx.videoRef}></video> : null}
			</div>

			<div className="cam-controls-container">
				{cameraCtx.cameraIsOn && <ToggleCameraBtn />}
				{cameraCtx.cameraIsOn && <GeoLocBtn />}
				{cameraCtx.cameraIsOn && <CaptureBtn />}
				{cameraCtx.cameraIsOn ? 
				<button id="self-timer-btn" className="icon-btn" onClick={toggleSelfTimer}>
					{cameraCtx.selfTimerOn ? 
						<img src={timerActiveIcon} alt="Deactivate timer" />
						:
						<img src={timerIcon} alt="Activate timer" /> 
					}
				</button>
				: null }
			</div>
		</div>)
}




export default Camera