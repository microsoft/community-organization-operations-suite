/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { PlaywrightTestConfig } from '@playwright/test'
import config from 'config'

const playwrightConfiguration: PlaywrightTestConfig = {
	use: {
		headless: config.get('headless'),
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'on-first-retry'
	},
	// default # workers. If you want to see your tests run you can limit this.
	workers: config.get('workers') ?? undefined
}
export default playwrightConfiguration
