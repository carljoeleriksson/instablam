import React, {useState, createContext, useRef } from 'react'

export const CameraContext = createContext();

function CameraContextProvider(props) {
	const [cameraCtx, setCameraCtx] = useState({
		cameraIsOn: false,
		videoRef: useRef(null),
		photoRef: useRef(null),
		selfTimerOn: false,
		selfTimerSec: null,
		statusMessage: '',
		stream: {}
	})
	function updateCameraCtx(updates) {
		setCameraCtx({
			...cameraCtx,
			...updates
		})
	}

	return (
		<div>
			<CameraContext.Provider value={[cameraCtx, updateCameraCtx]}>
				{props.children}
			</CameraContext.Provider>
			
		</div>
	)
}

export default CameraContextProvider
