/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { QueryServicesArgs, Service } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { ServiceCollection } from '~db/ServiceCollection'
import { createGQLService } from '~dto'
import type { Interactor, RequestContext } from '~types'
import { empty } from '~utils/noop'

@singleton()
export class GetServicesInteractor implements Interactor<unknown, QueryServicesArgs, Service[]> {
	public constructor(private services: ServiceCollection) {}

	public async execute(
		_: unknown,
		{ orgId }: QueryServicesArgs,
		ctx: RequestContext
	): Promise<Service[]> {
		// out-of-org users should not see org services
		if (!ctx.identity?.roles.some((r) => r.org_id === orgId)) {
			return empty
		}
		const result = await this.services.items({}, { org_id: orgId })
		return result.items.map(createGQLService)
	}
}
