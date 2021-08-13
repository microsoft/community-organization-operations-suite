/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Address } from '@community-organization-operations-suite/schema/lib/provider-types'
import type { DbAddress } from '~db'

export function createGQLAddress({ street, zip, unit, city, state }: DbAddress): Address {
	return {
		__typename: 'Address',
		street,
		zip,
		unit,
		city,
		state
	}
}
