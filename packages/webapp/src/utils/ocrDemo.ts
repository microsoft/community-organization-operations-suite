/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Demo Code
 * Needs to be clean up in next sprint
 */
import { imageOcrData } from './demoData'

const callOCR = async (file) => {
	const formdata = new FormData()
	let ocrResult = null
	formdata.append('file', file)

	const requestOptions = {
		method: 'POST',
		body: formdata
	}
	ocrResult = await fetch('https://cbo-ops-suite.azurewebsites.net/api/ocr', requestOptions)
	return ocrResult
}

const localFile = async (file) => {
	const request = await callOCR(file)
	const result = []
	for (const { key, value, confidence } of request) {
		// console.log("- Key  :", `"${key.content}"`);
		// console.log("  Value:", `"${value?.content ?? "<undefined>"}" (${confidence})`);
		result.push({
			key: key.content,
			value: value?.content ?? '<undefined>',
			confidence: confidence
		})
	}
	return result
}

export default localFile
