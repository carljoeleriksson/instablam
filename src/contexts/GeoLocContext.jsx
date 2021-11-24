import React, {useState, createContext } from 'react'

export const GeoLocContext = createContext();

function GeoLocContextProvider(props) {
	const [geoLocCtx, setGeoLocCtx] = useState({
		hasGeoLoc: false,
		geoInfoObj: {}
	});

	function updateGeoLocCtx(updates) {
		setGeoLocCtx({
			...geoLocCtx,
			...updates
		})
	}

	return (
		<div>
			<GeoLocContext.Provider value={[geoLocCtx, updateGeoLocCtx]}>
				{props.children}
			</GeoLocContext.Provider>
		</div>
	)
}

export default GeoLocContextProvider
