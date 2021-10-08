/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable jest/expect-expect */
import config from 'config'
import { PageObjects } from '../pageobjects'
import { test } from '@playwright/test'
import { clearLocalStorage, commonStartup, TestContext } from '../scaffold'

const username = config.get<string>('user.login')
const password = config.get<string>('user.password')

test.describe('The user login flow', () => {
	let ctx: TestContext
	let po: PageObjects

	test.beforeAll(async ({ browser }) => {
		ctx = await commonStartup(browser)
		po = ctx.objects
	})

	test.beforeEach(async () => {
		await po.loginPage.open()
		await po.loginPage.waitForLoad()
	})

	test.afterEach(async () => {
		await clearLocalStorage(ctx.page)
	})

	test.describe('should log in with valid credentials', () => {
		test('and log out using the header', async () => {
			await po.loginPage.login(username, password)
			await po.dashboardPage.waitForLoad()
			await po.header.logout()
			await po.loginPage.waitForLoad()
		})

		test('and log out via navigation', async () => {
			await po.loginPage.login(username, password)
			await po.dashboardPage.waitForLoad()
			await po.logoutPage.open()
			await po.loginPage.waitForLoad()
		})
	})
})
