/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { singleton } from 'tsyringe'
import { DatabaseConnector } from '~components/DatabaseConnector'
import { CollectionBase } from './CollectionBase'
import type { DbContact } from './types'

@singleton()
export class ContactCollection extends CollectionBase<DbContact> {
	public constructor(connector: DatabaseConnector) {
		super(connector.contactsCollection)
	}

	public findContactsWithOrganization(orgId: string) {
		// TODO: add pagination
		return this.items({}, { org_id: orgId })
	}

	public countWithTagsInOrg(orgId: string, tagId: string) {
		return this.count({ org_id: { $eq: orgId }, tags: { $eq: tagId } })
	}
}
