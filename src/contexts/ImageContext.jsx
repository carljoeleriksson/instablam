import React, {useState, createContext, useRef } from 'react'

export const ImageContext = createContext();

function ImageContextProvider(props) {
	const [imageCtx, setImageCtx] = useState({
		id: null,
		url:"",
		location: ""
	});

	function updateImageCtx(updates) {
		setImageCtx({
			...imageCtx,
			...updates
		})
	}

	return (
		<div>
			<ImageContext.Provider value={[imageCtx, updateImageCtx]}>
				{props.children}
			</ImageContext.Provider>
		</div>
	)
}

export default ImageContextProvider
