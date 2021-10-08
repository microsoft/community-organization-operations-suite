/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Browser, Page } from '@playwright/test'
import { startCoverage, stopCoverage } from './coverage'
import { createPageObjects, PageObjects } from './pageobjects'

export interface TestContext {
	page: Page
	objects: PageObjects
}
export async function commonStartup(browser: Browser): Promise<TestContext> {
	const page = await browser.newPage()
	await startCoverage(browser, page)
	const objects = createPageObjects(page)
	return { page, objects }
}

export async function commonTeardown(browser: Browser, page: Page): Promise<void> {
	await clearLocalStorage(page)
	await stopCoverage(browser, page)
}

export async function clearLocalStorage(page: Page): Promise<void> {
	await page.evaluate(() => localStorage.clear())
}
