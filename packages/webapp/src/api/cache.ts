/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { config } from '~utils/config'
import { InMemoryCache } from '@apollo/client/core'
import localForage from 'localforage'
import { persistCache, LocalForageWrapper } from 'apollo3-cache-persist'
import { createLogger } from '~utils/createLogger'

/**
 * Setup the "InMemoryCache" for Apollo.
 *
 * If the `durableCache` feature has been enabled in the config:
 *  	1. We setup `apollo3-cache-persist` to handle cache persistence.
 *		2. `localforage` is used to handle Browser native storages APIs.
 * 		3. Everything is logged.
 */

let isDurableCacheInitialized = false
const isDurableCacheEnabled = Boolean(config.features.durableCache.enabled) ?? false
const logger = createLogger('cache')
const cache: InMemoryCache = new InMemoryCache()

export function getCache() {
	if (!isDurableCacheInitialized && isDurableCacheEnabled) {
		logger('durable cache enabled')
		persistCache({ cache, storage: new LocalForageWrapper(localForage) })
			.then(() => {
				isDurableCacheInitialized = true
				logger('cache persisted')
			})
			.catch((err) => logger('error persisting cache', err))
	} else {
		logger('durable cache disabled')
	}
	return cache
}
