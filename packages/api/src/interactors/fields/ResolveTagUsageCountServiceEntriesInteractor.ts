/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TagUsageCount } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { ServiceEntryTagCounter } from '~components/ServiceEntryTagCounter'
import type { Interactor } from '~types'

@singleton()
export class ResolveTagUsageCountServiceEntriesInteractor
	implements Interactor<TagUsageCount, unknown, number>
{
	public constructor(private counter: ServiceEntryTagCounter) {}

	public async execute(_: TagUsageCount) {
		const tag_id = (_ as any).tag_id
		const org_id = (_ as any).org_id
		return this.counter.count(org_id, tag_id)
	}
}
