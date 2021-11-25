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
		updateGeoLocCtx({geoInfoObj: geoInfoObject})
	}

	function handleClick() {
		if('geolocation' in navigator) {
			console.log('Location available in navigator');

			let geo = navigator.geolocation

			geo.getCurrentPosition(
				pos => {
					updateGeoLocCtx({hasGeoLoc: true})
					
					console.log('Current coordinates are: ', pos.coords);
					const lat = pos.coords.latitude
					const long = pos.coords.longitude

					console.log('Your coordinates: ', lat, long);

					getGeoInfo(lat, long)
				},
				error => {
					console.log(error.message)
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
			}
		} catch (error) {
			console.log(error.message)
			//uppdatera statusmeddelande här.
		}
	}

	return (
			<button id="geo-loc-btn" className="icon-btn" onClick={handleClick}>
				<img src={GeoLocIcon} />
			</button>
	)
}

export default GeoLocBtn
