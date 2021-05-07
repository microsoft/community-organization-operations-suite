/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FontIcon } from '@fluentui/react'
import cx from 'classnames'
import styles from './index.module.scss'
import type ComponentProps from '~types/ComponentProps'
// TODO: add right chevron element

interface DetailsListTitleProps extends ComponentProps {
	title?: string
}

export default function DetailsListTitle({ children }: DetailsListTitleProps): JSX.Element {
	return (
		<h2 className={cx('d-flex align-items-center', styles.detailsListTitle)}>
			{/* TODO: add right chevron element */}
			<FontIcon className={cx('me-2', styles.icon)} iconName='ChevronRight' />
			{/* TODO: consider adding transform on hover */}
			{children}
		</h2>
	)
}
