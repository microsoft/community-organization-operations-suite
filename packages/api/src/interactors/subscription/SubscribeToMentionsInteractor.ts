/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SubscriptionMentionsArgs } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { Publisher } from '~components/Publisher'
import type { Interactor } from '~types'

@singleton()
export class SubscribeToMentionsInteractor
	implements Interactor<unknown, SubscriptionMentionsArgs, AsyncIterable<any>>
{
	public constructor(private publisher: Publisher) {}

	public async execute(
		_: unknown,
		{ userId }: SubscriptionMentionsArgs
	): Promise<AsyncIterable<any>> {
		return {
			[Symbol.asyncIterator]: () => this.publisher.subscribeToMentions(userId)
		}
	}
}
