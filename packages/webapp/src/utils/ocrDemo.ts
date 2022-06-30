/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import 'dotenv/config'
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer'

const key = process.env.OCR_KEY
const endpoint = process.env.OCR_ENDPOINT

export async function localFile(file) {
	const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key))
	const poller = await client.beginAnalyzeDocument('prebuilt-document', file) //{
	//     contentType: "image/png",
	//     onProgress: (state) => { console.log(`status: ${state.status}`); }
	// });
	const roughResult = await poller.pollUntilDone()
	// console.log('roughResult', roughResult)
	const { keyValuePairs } = roughResult
	// console.log("Key-Value Pairs:");
	const result = []
	for (const { key, value, confidence } of keyValuePairs) {
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
