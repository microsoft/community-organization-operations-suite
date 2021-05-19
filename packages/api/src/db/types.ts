/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { RoleType } from '@greenlight/schema/lib/provider-types'

export interface DbUser {
	id: string
	first_name: string
	middle_name: string
	last_name: string
	roles: DbRole[]
}

export interface DbRole {
	org_id: string
	role_type: RoleType
}

export interface DbAction {
	comment: string
	user_id: string
	date: string
}

export interface DbContact {
	id: string
	first_name: string
	middle_name: string
	last_name: string
	engagements: DbEngagement[]
}

export interface DbEngagement {
	org_id: string
	start_date: string
	end_date: string
	actions: DbAction[]
}

export interface DbOrganization {
	id: string
	description: string
	name: string
	users: string[]
}
