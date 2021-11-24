import { useState, useEffect, useRef, useContext } from "react";
import './camera.css'

import { CameraContext } from '../contexts/CameraContext'


import timerActiveIcon from '../assets/timer-active-icon.png'
import timerIcon from '../assets/timer-icon.png'

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

	return (
		<div id="cam-container">
			<div className="cam-elem">
				{canUseMd ? <video ref={cameraCtx.videoRef}></video> : null}
			</div>

			<div className="cam-controls-container">
				<ToggleCameraBtn />
				{cameraCtx.cameraIsOn && <GeoLocBtn />}
				{cameraCtx.cameraIsOn && <CaptureBtn />}
				{cameraCtx.cameraIsOn ? 
				<button id="self-timer-btn" className="icon-btn">
					{timerIsOn ? 
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