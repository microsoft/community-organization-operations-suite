/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Tag, Service } from '@cbosuite/schema/dist/provider-types'
import { singleton } from 'tsyringe'
import type { TagCollection } from '~db/TagCollection'
import { createGQLTag } from '~dto'
import type { Interactor } from '~types'
import { empty } from '~utils/noop'

@singleton()
export class ResolveServiceTagsInteractor implements Interactor<Service, unknown, Tag[]> {
	public constructor(private tags: TagCollection) {}

	public async execute(_: Service) {
		if (!_?.tags) return empty

		const result: Tag[] = []
		const tagArr = _.tags as any as string[]
		for (const tagId of tagArr) {
			const tag = await this.tags.itemById(tagId)
			if (tag?.item) {
				result.push(createGQLTag(tag.item))
			}
		}
		return result
	}
}
