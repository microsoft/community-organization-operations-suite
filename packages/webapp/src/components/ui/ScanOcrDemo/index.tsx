/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Demo Code
 * Needs to be clean up in next sprint
 */

import { useRef, useState, memo } from 'react'
import scanFile from '~utils/ocrDemo'
import { DefaultButton } from '@fluentui/react/lib/Button'
import type { StandardFC } from '~types/StandardFC'

let inputElement = null
let imgSrc = null
let imgResult = null

function confidenceColour(confidence) {
	let colour = ''
	if (confidence > 80.0) {
		colour = 'green'
	} else if (confidence < 80.0 && confidence > 50.0) {
		colour = 'goldenrod'
	} else {
		colour = 'red'
	}
	return colour
}

function input(inputValue) {
	if (inputValue === ':selected:') {
		return <input type='checkbox' checked={true} />
	} else if (inputValue === ':unselected:') {
		return <input type='checkbox' checked={false} />
	} else {
		return <input size={40} value={inputValue ?? '<NO Input>'} />
	}
}

function showResult(results) {
	const show = []
	for (const { key, value, confidence } of results) {
		const formattedConfidence = (confidence * 100).toFixed(2)
		show.push(
			<div key={show.length} style={{ padding: '5px', fontSize: 'initial' }}>
				<h3 style={{ display: 'flex', fontWeight: 'bold' }}>{key}</h3>
				<div style={{ display: 'flex' }}>{input(value)}</div>
				<div
					style={{ display: 'flex', color: confidenceColour(formattedConfidence) }}
				>{`Confidence: ${formattedConfidence}%`}</div>
			</div>
		)
	}
	return show
}

interface ScanOcrDemoProps {
	onClose?: () => void
	isLoaded?: (loaded: boolean) => void
}

export const ScanOcrDemo: StandardFC<ScanOcrDemoProps> = memo(function ScanOcrDemo({}) {
	const imgRef = useRef(null)
	const [scanResult, setScanResult] = useState(null)
	const turnOnNativeCameraApp = () => {
		inputElement.click()
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: '20px 0px 20px 0px'
				}}
			>
				<DefaultButton
					text={'Start Camera'}
					style={{ fontSize: 'large' }}
					onClick={turnOnNativeCameraApp}
				/>
				<input
					ref={(input) => (inputElement = input)}
					id='camerFileInput'
					type='file'
					accept='image/png'
					capture='environment' //'environment' Or 'user'
					style={{ display: 'none' }}
					onChange={async (event) => {
						const imgFile = event.target.files[0]
						imgSrc = window.URL.createObjectURL(imgFile)
						imgRef.current.setAttribute('src', imgSrc)
						imgResult = await scanFile(imgFile)
						setScanResult(imgResult)
					}}
				/>
			</div>
			<div style={{ display: 'flex' }}>
				<img
					id='pictureFromCamera'
					ref={imgRef}
					alt='taken from mobile'
					style={{ width: '50%', height: '50%' }}
				/>
				{scanResult !== null ? (
					<div style={{ height: '90%', padding: '0px 0px 15px 15px', overflowY: 'scroll' }}>
						{showResult(imgResult)}
					</div>
				) : (
					<p> </p>
				)}
			</div>
		</>
	)
})
