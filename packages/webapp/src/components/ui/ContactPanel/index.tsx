/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Panel as FluentPanel, PanelType } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks'
import cx from 'classnames'
import { memo, useEffect } from 'react'
import styles from './index.module.scss'
import type { StandardFC } from '~types/StandardFC'
import { useTranslation } from '~hooks/useTranslation'
import { ContactPanelBody } from '~ui/ContactPanelBody'
import { noop } from '~utils/noop'

interface ContactPanelProps {
	openPanel?: boolean
	onDismiss?: () => void
	contactId: string
}

export const ContactPanel: StandardFC<ContactPanelProps> = memo(function ContactPanel({
	onDismiss = noop,
	contactId,
	openPanel = false
}) {
	const [isOpen, { setTrue: openFluentPanel, setFalse: dismissPanel }] = useBoolean(false)
	const { c } = useTranslation()

	useEffect(() => {
		openPanel ? openFluentPanel() : dismissPanel()
	}, [dismissPanel, openFluentPanel, openPanel])

	return (
		<div className={cx(styles.wrapper)}>
			<FluentPanel
				isLightDismiss
				isOpen={isOpen}
				type={PanelType.medium}
				closeButtonAriaLabel={c('panelActions.closeAriaLabel')}
				onDismiss={() => {
					onDismiss()
					dismissPanel()
				}}
				styles={{
					main: {
						marginTop: 'var(--action-bar--height)'
					},
					overlay: {
						marginTop: 'var(--action-bar--height)'
					},
					contentInner: {
						marginTop: -44
					},
					content: {
						padding: 0
					},
					subComponentStyles: {
						closeButton: {
							root: {
								backgroundColor: 'white',
								borderRadius: '50%',
								marginRight: 20,
								width: 26,
								height: 26
							},
							icon: {
								color: '#2f9bed',
								fontWeight: 600
							}
						}
					}
				}}
			>
				<div className={styles.body}>
					<ContactPanelBody contactId={contactId} />
				</div>
			</FluentPanel>
		</div>
	)
})
