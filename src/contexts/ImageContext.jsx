import React, {useState, createContext } from 'react'

export const ImageContext = createContext();

function ImageContextProvider(props) {
	const [imageCtx, setImageCtx] = useState([0]);

	return (
		<div>
			<ImageContext.Provider value={[imageCtx, setImageCtx]}>
				{props.children}
			</ImageContext.Provider>
		</div>
	)
}

export default ImageContextProvider
