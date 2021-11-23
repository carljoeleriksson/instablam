import React, {useContext} from 'react'

import camCaptureIcon from '../assets/cam-capture-icon.png'

import {CameraContext} from '../contexts/CameraContext.jsx'

function CaptureBtn() {
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	
	function handleClick(){
		takePicture(cameraCtx.stream.getVideoTracks()[0])
	}

	return (
		<button onClick={handleClick} id="capture-btn" className="icon-btn">
				<img src={camCaptureIcon} alt="Take picture" />
		</button>
	)
}


function saveToLocalStorage(imgUrl) {
	if(!localStorage.gallery) {
		const gallery = [
			{
				id: 1,
				url: imgUrl,
				location: "Palma, Mallis"
			}
		]

		localStorage.gallery = JSON.stringify(gallery)
	} else {
		const currentGallery = JSON.parse(localStorage.gallery)
		const imgObj = {
			id: currentGallery.length + 1,
			url: imgUrl,
			location: "Yorka, Mallis"
		}
		let gallery = [imgObj, ...currentGallery]
		
		localStorage.gallery = JSON.stringify(gallery)
	}
}

async function takePicture(stream) {
	const imageCapture = new ImageCapture(stream)
	let blob = await imageCapture.takePhoto()
	
	const takenPicSrc = URL.createObjectURL(blob)
	saveToLocalStorage(takenPicSrc)
}

export default CaptureBtn
