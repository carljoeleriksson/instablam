import React, {useContext} from 'react'

import GeoLocIcon from '../assets/svg/geoloc-icon.svg'

import {GeoLocContext} from '../contexts/GeoLocContext.jsx'



function GeoLocBtn() {
	const [geoLocCtx, updateGeoLocCtx] = useContext(GeoLocContext)

	function formatData(data) {
		const geoInfoObject = {
			address: data.staddress,
			zip: data.postal,
			city: data.city,
			country: data.country,
			lat: data.latt,
			long: data.longt
		}
		console.log('geoInfoObject: ', geoInfoObject);
		updateGeoLocCtx({
			status: 'Geolocation working',
			hasGeoLoc: true,
			geoInfoObj: geoInfoObject
		})
	}

	function handleClick() {
		if('geolocation' in navigator) {
			console.log('Location available in navigator');

			let geo = navigator.geolocation

			geo.getCurrentPosition(
				pos => {
					const lat = pos.coords.latitude
					const long = pos.coords.longitude
					
					console.log('Your coordinates: ', lat, long);
					updateGeoLocCtx({status: 'Getting location...'})
					getGeoInfo(lat, long)
				},
				error => {
					console.log(error.message)
					updateGeoLocCtx({status: 'Geolocation off'})
					//uppdatera statusmeddelande här.
				}
			)
		}
	}

	async function getGeoInfo(lat, long) {
		try {
			const res = await fetch(`https://geocode.xyz/${lat},${long}?json=1`)
			const data = await res.json()

			if(!data.error){
				console.log(data);
				formatData(data)
			} else {
				updateGeoLocCtx({status: 'No geolocation, try again!'})	
			}
		} catch (error) {
			updateGeoLocCtx({status: 'No geolocation, try again!'})
			console.log('ERROOOORR!', await error.message)
			//uppdatera statusmeddelande här.
		}
	}

	return (
			<button id="geo-loc-btn" className="icon-btn" onClick={handleClick}>
				<img src={GeoLocIcon} alt="Get Geolocation" />
			</button>
	)
}

export default GeoLocBtn
