import React, {useContext, useState} from 'react'

import camCaptureIcon from '../assets/svg/cam-capture-icon.svg'

import {CameraContext} from '../contexts/CameraContext.jsx'
import {ImageContext} from '../contexts/ImageContext.jsx'
import {GeoLocContext} from '../contexts/GeoLocContext.jsx'

import { SelfTimer } from '../components/SelfTimer'

function CaptureBtn() {
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [geoLocCtx, updateGeoLocCtx] = useContext(GeoLocContext)
	const [imageCtx, setImageCtx] = useContext(ImageContext)
	

	function saveToLocalStorage(imageObj) {
		if(!localStorage.gallery) {
			imageObj.id = 1; // setting initial value if no gallery to take .length as id from.
			const gallery = [imageObj]
	
			localStorage.gallery = JSON.stringify(gallery)
			setImageCtx(gallery); //a state used only to make the Gallery.jsx update properly
		} else {
			const currentGallery = JSON.parse(localStorage.gallery)
			imageObj.id = currentGallery.length + 1
			
			let gallery = [imageObj, ...currentGallery]
			localStorage.gallery = JSON.stringify(gallery)
			setImageCtx(gallery); //a state used only to make the Gallery.jsx update properly
		}
	}
	
	function saveToCache(imgUrl, timeTaken) {

		const imgObj = {
			id: 1,
			url: imgUrl,
			time: timeTaken,
			location: geoLocCtx.geoInfoObj.address + ', ' + geoLocCtx.geoInfoObj.city
		}
		CacheStorage.open('galleryCache').then(cache => {
			cache.add(imgObj)
		})

	}


	async function takePicture(stream) {
		console.log('geoLocCtx: ', geoLocCtx);
		const width = 300;
		const height = width / (4/3);
		
		const imageCapture = new ImageCapture(stream)
		let blob = await imageCapture.takePhoto()
		let imageUrl = URL.createObjectURL(blob)
		const timeTaken = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

		console.log('geoLocCtx: ', geoLocCtx);
		const locationObj = geoLocCtx.geoInfoObj 
		const imageObj = {
			id: null,
			url: imageUrl,
			time: timeTaken,
			location: 'Undisclosed location'
		}
		if(geoLocCtx.hasGeoLoc){
			imageObj.location = locationObj.address + ', ' + locationObj.city
		}
		
/* 		saveToCache(imageUrl, timeTaken) */
		saveToLocalStorage(imageObj)
	}





/* 	//Function for using canvas element then saving to localStorage
	async function takePicture() {
		const width = 300;
		const height = width / (4/3);

		let video = cameraCtx.videoRef.current;
		let photo = cameraCtx.photoRef.current;

		photo.width = width;
		photo.height = height;

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height)

		const dataURL = photo.toDataURL();

		const timeTaken = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		
		saveToLocalStorage(dataURL, timeTaken)
		
		ctx.clearRect(0, 0, photo.width, photo.height)

	} */

	function selfTimer() {
			const duration = 3;
			let timer = duration, seconds;
			let timerId;
			
			
			timerId = setInterval(function () {
				seconds = parseInt(timer % 60, 10);
				/* seconds = seconds < 10 ? "0" + seconds : seconds; */
				
				updateCameraCtx({selfTimerSec: seconds})

				if (--timer < 0) {
					timer = null
					takePicture(cameraCtx.stream.getVideoTracks()[0])
					updateCameraCtx({selfTimerSec: null})
					console.log('Klar!')
					clear()
				}
			}, 1000);
			
			function clear(){
				clearTimeout(timerId)
			}
	}

	function handleClick(){
		if(!cameraCtx.selfTimerOn){
			console.log('geoLocCtx: ', geoLocCtx);
			takePicture(cameraCtx.stream.getVideoTracks()[0])
		} else {
			console.log('geoLocCtx: ', geoLocCtx);
			selfTimer()
		}
		
	}

	return (<>
		<button onClick={handleClick} id="capture-btn" className="icon-btn">
				<img src={camCaptureIcon} alt="Capture"/>
		</button>
		
		</>
	)
}



export default CaptureBtn
