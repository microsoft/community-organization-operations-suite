/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ServiceAnswer, QueryServiceAnswersArgs } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import { ServiceAnswerCollection } from '~db/ServiceAnswerCollection'
import { ServiceCollection } from '~db/ServiceCollection'
import { createGQLServiceAnswer } from '~dto/createGQLServiceAnswer'
import { Interactor, RequestContext } from '~types'
import { empty } from '~utils/noop'

@singleton()
export class GetServicesAnswersInteractor
	implements Interactor<unknown, QueryServiceAnswersArgs, ServiceAnswer[]>
{
	public constructor(
		private services: ServiceCollection,
		private serviceAnswers: ServiceAnswerCollection
	) {}

	public async execute(
		_: unknown,
		{ serviceId, offset, limit }: QueryServiceAnswersArgs,
		ctx: RequestContext
	) {
		offset = offset ?? 0
		limit = limit ?? 250

		const { item: service } = await this.services.itemById(serviceId)
		if (!service) {
			return empty
		}

		// users outside of org should not see responses
		if (!ctx.identity?.roles.some((r) => r.org_id === service.org_id)) {
			return empty
		}
		const result = await this.serviceAnswers.items({ offset, limit }, { service_id: serviceId })
		return result.items.map(createGQLServiceAnswer)
	}
}
