/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { singleton } from 'tsyringe'
import type { OrgAuthEvaluationStrategy } from '~types'
import type { OrgIdArgumentStrategy } from './orgAuthStrategies/OrgIdArgumentStrategy'
import type { OrganizationSourceStrategy } from './orgAuthStrategies/OrganizationSourceStrategy'
import type { EntityIdToOrgIdStrategy } from './orgAuthStrategies/EntityIdToOrgIdStrategy'
import type { InputEntityToOrgIdStrategy } from './orgAuthStrategies/InputEntityToOrgIdStrategy'
import type { InputServiceAnswerEntityToOrgIdStrategy } from './orgAuthStrategies/InputServiceAnswerEntityToOrgIdStrategy'
import type { UserWithinOrgStrategy } from './orgAuthStrategies/UserWithinOrgStrategy'

@singleton()
export class OrgAuthStrategyListProvider {
	public constructor(
		private orgSource: OrganizationSourceStrategy,
		private orgIdArg: OrgIdArgumentStrategy,
		private entityIdToOrgId: EntityIdToOrgIdStrategy,
		private inputEntityToOrgId: InputEntityToOrgIdStrategy,
		private inputServiceAnswerEntityToOrgId: InputServiceAnswerEntityToOrgIdStrategy,
		private UserWithinOrgStrategy: UserWithinOrgStrategy
	) {}

	public get(): OrgAuthEvaluationStrategy[] {
		return [
			this.orgSource,
			this.orgIdArg,
			this.entityIdToOrgId,
			this.inputEntityToOrgId,
			this.inputServiceAnswerEntityToOrgId,
			this.UserWithinOrgStrategy
		]
	}
}
