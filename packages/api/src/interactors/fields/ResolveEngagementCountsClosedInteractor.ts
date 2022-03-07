/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { EngagementCounts } from '@cbosuite/schema/dist/provider-types'
import { EngagementStatus } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { EngagementCollection } from '~db/EngagementCollection'
import type { Interactor } from '~types'

@singleton()
export class ResolveEngagementCountsClosedInteractor
	implements Interactor<EngagementCounts, unknown, number>
{
	public constructor(private engagements: EngagementCollection) {}

	public async execute(_: EngagementCounts) {
		const user_id = (_ as any).user_id
		return this.engagements.count({
			user_id: user_id,
			status: { $eq: EngagementStatus.Closed }
		})
	}
}
