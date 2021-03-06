/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export function noop(...props: any[]): void {
	// noop
}

export function nullFn() {
	return null
}

export const empty = Object.freeze([]) as any as any[]

export const emptyStr = ''
