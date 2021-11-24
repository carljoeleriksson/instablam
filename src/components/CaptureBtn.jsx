import React, {useContext} from 'react'

import camCaptureIcon from '../assets/cam-capture-icon.png'

import {CameraContext} from '../contexts/CameraContext.jsx'
import {ImageContext} from '../contexts/ImageContext.jsx'


function CaptureBtn() {
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [imageCtx, updateImageCtx] = useContext(ImageContext)
	
	async function takePicture(stream) {
		const imageCapture = new ImageCapture(stream)
		let blob = await imageCapture.takePhoto()
		
		const takenPicSrc = URL.createObjectURL(blob)
		
		const imgObj = {
			id: imageCtx.id + 1,
			url: takenPicSrc,
			location: "Yorka, Mallis"
		}
	
		//saveToLocalStorage(takenPicSrc)
	}

	function handleClick(){
		takePicture(cameraCtx.stream.getVideoTracks()[0])
	}

	return (
		<button onClick={handleClick} id="capture-btn" className="icon-btn">
				<img src={camCaptureIcon} alt="Take picture" />
		</button>
	)
}

/*
spara takenpicture i imgCtx och låt Image.jsx rendera ut innehålllet där, 
så fort det kommer nåt nytt. Alltså så fort den variablen ändras så kör den koden.
useEffect
*/
/* 
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
} */



export default CaptureBtn
