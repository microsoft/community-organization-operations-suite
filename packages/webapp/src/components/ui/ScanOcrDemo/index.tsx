/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useRef, useState } from 'react'
import { localFile } from '~utils/ocrDemo'
import type { StandardFC } from '~types/StandardFC'
// import { Namespace, useTranslation } from '~hooks/useTranslation'
import { memo } from 'react'

let inputElement = null
let imgSrc = null
const imgResult = null

function showResult(results) {
	const show = []
	for (const { key, value, confidence } of results) {
		show.push(
			<div key={show.length} style={{ padding: '5px', fontSize: 'initial' }}>
				<div style={{ display: 'flex', fontWeight: 'bold' }}>{key}</div>
				<div style={{ display: 'flex' }}>{`Value: "${value ?? '<NO Input>'}"`}</div>
				<div style={{ display: 'flex' }}>{`Confidence: ${(confidence * 100).toFixed(2)}%`}</div>
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
	// export default function ScanOcrDemo () {
	const imgRef = useRef(null)
	const [scanResult, setScanResult] = useState(null)
	const turnOnNativeCameraApp = () => {
		inputElement.click()
	}

	return (
		<>
			<button onClick={turnOnNativeCameraApp} style={{ fontSize: 'large' }}>
				Start Camera
			</button>
			<input
				ref={(input) => (inputElement = input)}
				id='camerFileInput'
				type='file'
				accept='image/png'
				capture='environment'
				style={{ display: 'none' }}
				onChange={async (event) => {
					const imgFile = event.target.files[0]
					imgSrc = window.URL.createObjectURL(imgFile)
					imgRef.current.setAttribute('src', imgSrc)
					// imgResult = await localFile(imgFile)
					setScanResult(imgResult)
				}}
			/>
			<div style={{ display: 'flex' }}>
				<img id='pictureFromCamera' ref={imgRef} alt='' style={{ width: '50%', height: '50%' }} />
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
