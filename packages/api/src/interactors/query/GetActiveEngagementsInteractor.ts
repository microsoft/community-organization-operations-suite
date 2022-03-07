/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { EngagementStatus } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { Configuration } from '~components/Configuration'
import type { EngagementCollection } from '~db/EngagementCollection'
import type { DbEngagement } from '~db/types'
import { sortByDate } from '~utils'
import { GetEngagementsInteractorBase } from './GetEngagementsInteractorBase'

@singleton()
export class GetActiveEngagementsInteractor extends GetEngagementsInteractorBase {
	public constructor(protected engagements: EngagementCollection, protected config: Configuration) {
		super()
	}

	protected status = { $nin: [EngagementStatus.Closed, EngagementStatus.Completed] }

	protected sortBy(a: DbEngagement, b: DbEngagement) {
		return sortByDate({ date: a.start_date as string }, { date: b.start_date as string })
	}
}
