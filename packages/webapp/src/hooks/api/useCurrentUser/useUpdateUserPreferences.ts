/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { gql, useMutation } from '@apollo/client'
import type { MutationUpdateUserPreferencesArgs } from '@cbosuite/schema/dist/provider-types'
import type { User } from '@cbosuite/schema/dist/client-types'
import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '~store'

export type UpdateUserPreferencesCallback = (preferences: Record<string, unknown>) => void

export function useUpdateUserPreferences(): UpdateUserPreferencesCallback {
	const [currentUser, setCurrentUser] = useRecoilState<User | null>(currentUserState)
	const [updateUserPreferences] = useMutation<any, MutationUpdateUserPreferencesArgs>(
		UPDATE_USER_FCM_TOKEN
	)
	return useCallback(
		async (preferences: Record<string, unknown>) => {
			await updateUserPreferences({
				variables: { userId: currentUser.id, preferences: JSON.stringify(preferences) }
			})
			setCurrentUser({ ...currentUser, preferences: JSON.stringify(preferences) })
		},
		[updateUserPreferences, currentUser, setCurrentUser]
	)
}

const UPDATE_USER_FCM_TOKEN = gql`
	mutation updateUserPreferences($userId: String!, $preferences: String!) {
		updateUserPreferences(userId: $userId, preferences: $preferences) {
			message
		}
	}
`
