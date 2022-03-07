/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SubscriptionEngagementsArgs } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { Publisher } from '~components/Publisher'
import type { Interactor } from '~types'

@singleton()
export class SubscribeToEngagementsInteractor
	implements Interactor<unknown, SubscriptionEngagementsArgs, AsyncIterable<any>>
{
	public constructor(private publisher: Publisher) {}

	public async execute(
		_: unknown,
		{ orgId }: SubscriptionEngagementsArgs
	): Promise<AsyncIterable<any>> {
		return {
			[Symbol.asyncIterator]: () => this.publisher.subscribeToEngagements(orgId)
		}
	}
}
