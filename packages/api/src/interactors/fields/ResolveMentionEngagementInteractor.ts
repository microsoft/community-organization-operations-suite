/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Engagement, Mention } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { EngagementCollection } from '~db/EngagementCollection'
import { createGQLEngagement } from '~dto'
import type { Interactor } from '~types'

@singleton()
export class ResolveMentionEngagementInteractor
	implements Interactor<Mention, unknown, Engagement | null>
{
	public constructor(private engagements: EngagementCollection) {}

	public async execute(_: Mention) {
		if (!_.engagement) return null

		if (_.engagement.id) {
			return _.engagement
		}

		const engagementId = _.engagement as any as string
		const engagement = await this.engagements.itemById(engagementId)
		if (!engagement.item) {
			throw new Error('engagement not found for notification')
		}

		return createGQLEngagement(engagement.item)
	}
}
