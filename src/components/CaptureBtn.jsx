import React, {useContext} from 'react'

import camCaptureIcon from '../assets/svg/cam-capture-icon.svg'

import {CameraContext} from '../contexts/CameraContext.jsx'
import {ImageContext} from '../contexts/ImageContext.jsx'
import {GeoLocContext} from '../contexts/GeoLocContext.jsx'

function CaptureBtn() {
	const [cameraCtx, updateCameraCtx] = useContext(CameraContext)
	const [geoLocCtx, updateGeoLocCtx] = useContext(GeoLocContext)
	const [imageCtx, setImageCtx] = useContext(ImageContext)
	

	function saveToLocalStorage(imgUrl, timeTaken) {
		if(!localStorage.gallery) {
			const gallery = [
				{
					id: 1,
					url: imgUrl,
					time: timeTaken,
					location: geoLocCtx.geoInfoObj.address + ', ' + geoLocCtx.geoInfoObj.city
				}
			]
	
			localStorage.gallery = JSON.stringify(gallery)
			setImageCtx(gallery.id);
		} else {
			const currentGallery = JSON.parse(localStorage.gallery)
			const imgObj = {
				id: currentGallery.length + 1,
				url: imgUrl,
				time: timeTaken,
				location: geoLocCtx.geoInfoObj.address + ', ' + geoLocCtx.geoInfoObj.city
			}
			let gallery = [imgObj, ...currentGallery]
			localStorage.gallery = JSON.stringify(gallery)
			setImageCtx(gallery);
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
		const width = 300;
		const height = width / (4/3);
		
		const imageCapture = new ImageCapture(stream)
		let blob = await imageCapture.takePhoto()
		/* 
		let image = new Image(width, height)
		image.src = URL.createObjectURL(blob)
		updateCameraCtx({images: [image]})
		 */
		let imageUrl = URL.createObjectURL(blob)
		updateCameraCtx({images: [imageUrl]})

		/* const takenPicSrc = URL.createObjectURL(blob) */
/* 
		let video = cameraCtx.videoRef.current;
		let photo = cameraCtx.photoRef.current;

		photo.width = width;
		photo.height = height;

		const dataURL = photo.toDataURL();
 */
		const timeTaken = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

/* 		saveToCache(takenPicSrc, timeTaken) */
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

	function handleClick(){
		console.log('geoLocCtx: ', geoLocCtx);
		takePicture(cameraCtx.stream.getVideoTracks()[0])
	}

	return (
		<button onClick={handleClick} id="capture-btn" className="icon-btn">
				<img src={camCaptureIcon} alt="Capture"/>
		</button>
	)
}



export default CaptureBtn
