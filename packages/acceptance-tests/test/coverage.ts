/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import config from 'config'
import { Browser, Page } from '@playwright/test'
import v8toIstanbul from 'v8-to-istanbul'

export async function startCoverage(browser: Browser, page: Page) {
	if (isCoverageSupported(browser, page)) {
		await page.coverage.startJSCoverage()
	}
}

export async function stopCoverage(browser: Browser, page: Page) {
	if (isCoverageSupported(browser, page)) {
		const coverage = await page.coverage.stopJSCoverage()
		for (const entry of coverage) {
			if (entry.source) {
				const converter = v8toIstanbul('', 0, { source: entry.source })
				await converter.load()
				converter.applyCoverage(entry.functions)
				// TODO: write coverage out, process into report
				//console.log(JSON.stringify(converter.toIstanbul()))
			}
		}
	}
}

function isCoverageSupported(_browser: Browser, _page: Page) {
	return config.get<boolean>('coverage')
}
