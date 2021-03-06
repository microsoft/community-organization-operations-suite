/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { OrgAuthDirectiveArgs, RoleType } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import { Authenticator } from '~components/Authenticator'
import { ORGANIZATION_TYPE } from '~dto'
import { RequestContext, OrgAuthEvaluationStrategy } from '~types'

@singleton()
export class OrganizationSourceStrategy implements OrgAuthEvaluationStrategy {
	public name = 'OrganizationSource'

	public constructor(private authenticator: Authenticator) {}

	public isApplicable(src: any): boolean {
		return src?.__typename === ORGANIZATION_TYPE
	}
	public async isAuthorized(
		src: any,
		directiveArgs: OrgAuthDirectiveArgs,
		resolverArgs: any,
		ctx: RequestContext
	): Promise<boolean> {
		return this.authenticator.isAuthorized(
			ctx.identity,
			src.id,
			directiveArgs.requires ?? RoleType.User
		)
	}
}
