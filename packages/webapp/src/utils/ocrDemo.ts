/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Demo Code
 * Needs to be clean up in next sprint
 */

const scanFile = async (file) => {
	const formdata = new FormData()
	let ocrResult = null
	formdata.append('file', file)

	const requestOptions = {
		method: 'POST',
		body: formdata
	}
	ocrResult = await fetch('https://cbo-ops-suite.azurewebsites.net/api/ocr', requestOptions)
	const response = await ocrResult.json()
	return response
}

export default scanFile
