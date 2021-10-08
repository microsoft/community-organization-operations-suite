/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { devices, PlaywrightTestConfig } from '@playwright/test'
import config from 'config'
import path from 'path'

const playwrightConfiguration: PlaywrightTestConfig = {
	workers: config.get('workers') ?? undefined,
	timeout: config.get('timeout') ?? 30000,
	use: {
		ignoreHTTPSErrors: true,
		headless: config.get('headless'),
		video: config.get('video'),
		trace: config.get('trace')
	},
	outputDir: path.join(__dirname, 'test-results')
}

if (config.get('allProjects')) {
	playwrightConfiguration.projects = [
		{
			name: 'Desktop Chrome',
			use: {
				browserName: 'chromium',
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'Desktop Firefox',
			use: {
				browserName: 'firefox',
				...devices['Desktop Firefox']
			}
		},
		{
			name: 'Desktop Safari',
			use: {
				browserName: 'webkit',
				...devices['Desktop Safari']
			}
		},
		{
			name: 'Desktop Edge',
			use: {
				browserName: 'chromium',
				...devices['Desktop Edge']
			}
		}
		// {
		// 	name: 'iPhone 12',
		// 	use: {
		// 		browserName: 'webkit',
		// 		...devices['iPhone 12']
		// 	}
		// },
		// {
		// 	name: 'Pixel 5',
		// 	use: {
		// 		browserName: 'chromium',
		// 		...devices['Pixel 5']
		// 	}
		// }
	]
}
export default playwrightConfiguration
