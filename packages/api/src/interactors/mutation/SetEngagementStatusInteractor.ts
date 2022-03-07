/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type {
	EngagementResponse,
	MutationSetEngagementStatusArgs
} from '@cbosuite/schema/dist/provider-types'
import { EngagementStatus } from '@cbosuite/schema/dist/provider-types'
import { UserInputError } from 'apollo-server-errors'
import { createDBAction, createGQLEngagement } from '~dto'
import type { Interactor, RequestContext } from '~types'
import { sortByDate } from '~utils'
import { SuccessEngagementResponse } from '~utils/response'
import { singleton } from 'tsyringe'
import type { Localization } from '~components/Localization'
import type { EngagementCollection } from '~db/EngagementCollection'
import type { Publisher } from '~components/Publisher'
import type { Telemetry } from '~components/Telemetry'

@singleton()
export class SetEngagementStatusInteractor
	implements Interactor<unknown, MutationSetEngagementStatusArgs, EngagementResponse>
{
	public constructor(
		private localization: Localization,
		private engagements: EngagementCollection,
		private publisher: Publisher,
		private telemetry: Telemetry
	) {}

	public async execute(
		_: unknown,
		{ engagementId: id, status }: MutationSetEngagementStatusArgs,
		{ identity, locale }: RequestContext
	) {
		const engagement = await this.engagements.itemById(id)
		if (!engagement.item) {
			throw new UserInputError(
				this.localization.t('mutation.setEngagementStatus.requestNotFound', locale)
			)
		}

		// Set status
		await this.engagements.updateItem({ id }, { $set: { status } })
		engagement.item.status = status

		if (status === EngagementStatus.Closed) {
			// Create action
			const currentUserId = identity?.id
			if (currentUserId) {
				const nextAction = createDBAction({
					comment: this.localization.t('mutation.setEngagementStatus.actions.markComplete', locale),
					orgId: engagement.item.org_id,
					userId: currentUserId,
					taggedUserId: currentUserId
				})

				await this.engagements.updateItem({ id }, { $push: { actions: nextAction } })
				engagement.item.actions = [...engagement.item.actions, nextAction].sort(sortByDate)
			}

			// Publish changes to websocketk connection
			await this.publisher.publishEngagementClosed(
				engagement.item.org_id,
				createGQLEngagement(engagement.item),
				locale
			)
		}

		this.telemetry.trackEvent('SetEngagementStatus')
		return new SuccessEngagementResponse(
			this.localization.t('mutation.setEngagementStatus.success', locale),
			createGQLEngagement(engagement.item)
		)
	}
}
