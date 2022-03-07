/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Tag, Organization } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { TagCollection } from '~db/TagCollection'
import { createGQLTag } from '~dto'
import type { Interactor } from '~types'
import { empty } from '~utils/noop'

@singleton()
export class ResolveOrganizationTagsInteractor implements Interactor<Organization, unknown, Tag[]> {
	public constructor(private tags: TagCollection) {}

	public async execute(_: Organization) {
		const result = await this.tags.findTagsWithOrganization(_.id)
		const orgTags = result.items ?? empty
		return orgTags.map(createGQLTag)
	}
}
