/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Contact, Engagement } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { EngagementCollection } from '~db/EngagementCollection'
import { createGQLEngagement } from '~dto'
import type { Interactor } from '~types'
import { empty } from '~utils/noop'

@singleton()
export class ResolveContactEngagementsInteractor
	implements Interactor<Contact, unknown, Engagement[]>
{
	public constructor(private engagements: EngagementCollection) {}

	public async execute(_: Contact) {
		const { items: result } = await this.engagements.items(
			{},
			{
				contacts: _.id
			}
		)
		return result?.map(createGQLEngagement) ?? empty
	}
}
