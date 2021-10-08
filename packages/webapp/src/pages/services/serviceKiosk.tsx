/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, useCallback, useState } from 'react'
import { useServiceList } from '~hooks/api/useServiceList'
import { useCurrentUser } from '~hooks/api/useCurrentUser'
import { useTranslation } from '~hooks/useTranslation'
import { wrap } from '~utils/appinsights'
import { FormGenerator } from '~components/ui/FormGenerator'
import { useLocationQuery } from '~hooks/useLocationQuery'
import { Title } from '~components/ui/Title'
import { NewFormPanel } from '~components/ui/NewFormPanel'

const EditServicePage: FC = wrap(function EditService() {
	const { orgId } = useCurrentUser()
	const { t } = useTranslation('services')
	const { serviceList, addServiceAnswer } = useServiceList(orgId)
	const [showForm, setShowForm] = useState(true)
	const [openNewFormPanel, setOpenNewFormPanel] = useState(false)
	const [newFormName, setNewFormName] = useState(null)
	const { sid } = useLocationQuery()

	const selectedService =
		typeof sid === 'string' ? serviceList.find((s) => s.id === sid) : undefined

	const handleAddServiceAnswer = useCallback(
		async (values) => {
			const res = await addServiceAnswer(values)
			if (res) {
				// Note: need a better way to do this
				setShowForm(false)
				setShowForm(true)
			}
		},
		[setShowForm, addServiceAnswer]
	)
	const title = t('pageTitle')
	const onDismiss = useCallback(() => setOpenNewFormPanel(false), [setOpenNewFormPanel])
	const onAddNewClient = useCallback(() => {
		setOpenNewFormPanel(true)
		setNewFormName('addClientForm')
	}, [setOpenNewFormPanel, setNewFormName])
	const onQuickActions = useCallback(() => {
		setOpenNewFormPanel(true)
		setNewFormName('quickActionsPanel')
	}, [])

	return (
		<>
			<Title title={title} />
			<NewFormPanel
				showNewFormPanel={openNewFormPanel}
				newFormPanelName={newFormName}
				onNewFormPanelDismiss={onDismiss}
			/>
			<div className='mt-5 serviceKioskPage'>
				{showForm && (
					<FormGenerator
						service={selectedService}
						onSubmit={handleAddServiceAnswer}
						previewMode={false}
						onAddNewClient={onAddNewClient}
						onQuickActions={onQuickActions}
					/>
				)}
			</div>
		</>
	)
})

export default EditServicePage
