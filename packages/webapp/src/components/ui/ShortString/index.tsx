/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useState } from 'react'
import type { StandardFC } from '~types/StandardFC'
import { useTranslation } from '~hooks/useTranslation'

interface ShortStringProps {
	text?: string
	limit?: number
	readMoreLabel?: string
	readLessLabel?: string
	showReadMoreLess?: boolean
}

/**
 *
 * @returns {JSX.Element} component with read more / read less button
 */
export const ShortString: StandardFC<ShortStringProps> = memo(function ShortString({
	text = '',
	limit = 80,
	readMoreLabel = '...More',
	readLessLabel = '...Less',
	showReadMoreLess = true
}) {
	const { c } = useTranslation()
	const needsReadMore = text?.length > limit
	const subString = needsReadMore ? text.substr(0, limit - 1) : text
	const [isReadMoreOpen, setReadMoreOpen] = useState(false)

	readMoreLabel = c('shortString.more')
	readLessLabel = c('shortString.less')

	if (needsReadMore)
		return (
			<>
				{isReadMoreOpen ? text : subString}
				{/* TODO: This is currently not accessible via tab controls NOT-ACCESSIBLE  */}
				{showReadMoreLess ? (
					<a className='text-decoration-none ' onClick={() => setReadMoreOpen(!isReadMoreOpen)}>
						{isReadMoreOpen ? readLessLabel : readMoreLabel}
					</a>
				) : (
					'...'
				)}
			</>
		)
	else return <>{text}</>
})
