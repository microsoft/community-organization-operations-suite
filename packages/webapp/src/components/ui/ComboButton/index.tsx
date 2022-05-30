/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu'
import { Icon } from '@fluentui/react'
import * as React from 'react'
import cx from 'classnames'
import { useState, memo } from 'react'
import styles from './index.module.scss'
import type { StandardFC } from '~types/StandardFC'

export interface IComboButtonProps<T> {
	mainButton: IButtonProps
	context: T
	className?: string
	iconName?: string
	isDisabled?: boolean
	menuOptions?: IButtonProps[]
}

export interface IButtonProps {
	key: string
	text: string
	className?: string
	isDisabled?: boolean
	onActionClick?: (A) => void
}

export const ComboButton: StandardFC<IComboButtonProps<unknown>> = memo(function ComboButton({
	mainButton,
	context,
	menuOptions,
	iconName = 'CaretSolidDown',
	isDisabled
}) {
	const linkRef = React.useRef(null)
	const [personaMenuOpen, setPersonaMenuOpen] = useState(false)
	const items: Array<IButtonProps> = menuOptions.map((opt) => {
		return {
			key: opt.key,
			text: opt.text,
			onClick: () => opt.onActionClick(context)
		}
	})

	return (
		<>
			<button
				disabled={mainButton.isDisabled}
				onClick={() => mainButton.onActionClick(context)}
				className={cx(
					'btn btn-primary d-flex justify-content-center align-items-center',
					styles.mainButton
				)}
			>
				{mainButton.text}
			</button>
			<button
				className={cx(
					'btn btn-primary d-flex justify-content-center align-items-center',
					styles.menuButton
				)}
				type='button'
				ref={linkRef}
				disabled={isDisabled}
				onClick={() => (personaMenuOpen ? setPersonaMenuOpen(false) : setPersonaMenuOpen(true))}
			>
				<Icon iconName={iconName} />
			</button>
			<ContextualMenu
				items={items}
				hidden={!personaMenuOpen}
				target={linkRef}
				onItemClick={() => setPersonaMenuOpen(false)}
				onDismiss={() => setPersonaMenuOpen(false)}
			/>
		</>
	)
})
