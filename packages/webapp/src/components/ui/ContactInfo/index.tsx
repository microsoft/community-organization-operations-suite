/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Icon } from '@fluentui/react'
import type { StandardFC } from '~types/StandardFC'
import { memo } from 'react'

interface ContactInfoProps {
	contact?: {
		email: string
		phone?: string
		address?: {
			street?: string
			city?: string
			state?: string
			county?: string
			zip?: string
		}
	}
}

export const ContactInfo: StandardFC<ContactInfoProps> = memo(function ContactInfo({ contact }) {
	if (!contact) return null
	const { email, phone } = contact
	const { street, city, state, zip, county } = contact.address || {}

	return (
		<>
			{/* TODO: replace format with proper util */}
			{phone && (
				<span className='d-flex align-items-center mb-2' data-contact-field='phone'>
					<Icon iconName='CellPhone' className='me-3' />
					<a href={`tel:${phone}`}>
						{phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')}
					</a>
				</span>
			)}
			{email && (
				<span className='d-flex align-items-center mb-2' data-contact-field='email'>
					<Icon iconName='Mail' className='me-3' />
					<a href={`mailto:${email}`}>{email}</a>
				</span>
			)}
			{(street || city || state || zip || county) && (
				<span className='d-flex align-items-start mb-2' data-contact-field='address'>
					<Icon iconName='POI' className='me-3' />
					<div>
						{street && <div>{street}</div>}
						<div>
							{city && `${city}, `}
							{state && `${state}, `}
							{zip && zip.toString()}
						</div>
						{county && <div>{county}</div>}
					</div>
				</span>
			)}
		</>
	)
})
