/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable jest/expect-expect */
import { test, expect } from '@playwright/test'
import { configuration } from '../configuration'
import { PageObjects } from '../pageobjects'
import { clearLocalStorage, commonStartup, TestContext } from '../scaffold'

test.describe('The application header', () => {
	let ctx: TestContext
	let po: PageObjects

	test.beforeAll(async ({ browser }) => {
		ctx = await commonStartup(browser)
		po = ctx.objects
		await po.sequences.login()
	})

	test.beforeEach(async () => {
		await po.dashboardPage.open()
		await po.dashboardPage.waitForLoad()
	})

	test.afterAll(async () => {
		await clearLocalStorage(ctx.page)
	})

	test('can navigate to dashboard page', async () => {
		await po.servicesPage.open()
		await po.servicesPage.waitForLoad()
		await po.header.clickDashboardLink()
		await po.dashboardPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/dashboard.png' })
	})

	test('can navigate to services page', async () => {
		await po.header.clickServicesLink()
		await po.servicesPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/services_page.png' })
	})

	test('can navigate to specialists page', async () => {
		await po.header.clickSpecialistsLink()
		await po.specialistsPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/specialists_page.png' })
	})

	test('can navigate to clients page', async () => {
		await po.header.clickClientsLink()
		await po.clientsPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/clients_page.png' })
	})

	test('can navigate to tags page', async () => {
		await po.header.clickTagsLink()
		await po.tagsPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/tags_page.png' })
	})

	test('can navigate to reporting page', async () => {
		await po.header.clickReportingLink()
		await po.reportPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/reporting_page.png' })
	})

	test('can navigate to profile page', async () => {
		await po.profilePage.open()
		await po.profilePage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/profile_page.png' })
	})

	test('can navigate to not-found page', async () => {
		await po.notFoundPage.open()
		await po.notFoundPage.waitForLoad()
		await ctx.page.screenshot({ path: 'screenshots/not_found_page.png' })
	})

	test('can switch between languages', async () => {
		await po.sequences.selectSpanishLanguage()
		await po.dashboardPage.waitForLoad()

		await expect(ctx.page).toHaveURL(`${configuration.url}/?locale=es-US`)
		let createRequestLabelText = await po.dashboardPage.getNewRequestLabel()
		expect(createRequestLabelText).toContain('Crear una solicitud')

		await po.sequences.selectEnglishLanguage()
		await po.dashboardPage.waitForLoad()

		await expect(ctx.page).toHaveURL(`${configuration.url}/?locale=en-US`)
		createRequestLabelText = await po.dashboardPage.getNewRequestLabel()
		expect(createRequestLabelText).toContain('Create a Request')
	})

	test('can show notifications pane', async () => {
		await po.header.clickNotificationsBell()
		await po.header.waitForNotificationsPanelToShow()
	})
})
