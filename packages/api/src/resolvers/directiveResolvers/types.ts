/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { NextResolverFn } from '@graphql-tools/utils'
import { RequestContext } from '~types'

export type DirectiveResolverFn = (
	next: NextResolverFn,
	src: any,
	directiveArgs: any,
	resolverArgs: any,
	context: RequestContext,
	info: any,
	loc: string
) => Promise<any>
