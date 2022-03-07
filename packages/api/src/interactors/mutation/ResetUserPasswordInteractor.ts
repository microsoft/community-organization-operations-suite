/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	MutationResetUserPasswordArgs,
	UserResponse
} from '@cbosuite/schema/dist/provider-types'
import { UserInputError } from 'apollo-server-errors'
import { createGQLUser } from '~dto'
import type { Interactor, RequestContext } from '~types'
import { getPasswordResetHTMLTemplate, createLogger } from '~utils'
import { SuccessUserResponse } from '~utils/response'
import { singleton } from 'tsyringe'
import type { Localization } from '~components/Localization'
import type { Configuration } from '~components/Configuration'
import type { Authenticator } from '~components/Authenticator'
import { MailerProvider } from '~components/MailerProvider'
import type { UserCollection } from '~db/UserCollection'
import type { Telemetry } from '~components/Telemetry'

const logger = createLogger('interactors:reset-user-password')

@singleton()
export class ResetUserPasswordInteractor
	implements Interactor<unknown, MutationResetUserPasswordArgs, UserResponse>
{
	private mailer: MailerProvider

	public constructor(
		private localization: Localization,
		private config: Configuration,
		private authenticator: Authenticator,
		private users: UserCollection,
		private telemetry: Telemetry
	) {
		this.mailer = new MailerProvider(config)
	}

	public async execute(
		_: unknown,
		{ userId: id }: MutationResetUserPasswordArgs,
		{ locale }: RequestContext
	): Promise<UserResponse> {
		const user = await this.users.itemById(id)
		if (!user.item) {
			throw new UserInputError(
				this.localization.t('mutation.resetUserPassword.userNotFound', locale)
			)
		}

		// If env is production and sendmail is not configured, don't reset user password.
		if (!this.config.isEmailEnabled && this.config.failOnMailNotEnabled) {
			throw new Error(this.localization.t('mutation.resetUserPassword.emailNotConfigured', locale))
		}

		const password = await this.authenticator.resetPassword(user.item)

		if (!password) {
			throw new Error(this.localization.t('mutation.resetUserPassword.resetError', locale))
		}

		let successMessage = this.localization.t('mutation.resetUserPassword.success', locale)
		if (this.config.isEmailEnabled) {
			try {
				await this.mailer.get().sendMail({
					from: `${this.localization.t('mutation.resetUserPassword.emailHTML.header', locale)} "${
						this.config.defaultFromAddress
					}"`,
					to: user.item.email,
					subject: this.localization.t('mutation.resetUserPassword.emailSubject', locale),
					text: this.localization.t('mutation.resetUserPassword.emailBody', locale, {
						password
					}),
					html: getPasswordResetHTMLTemplate(password, locale, this.localization)
				})
			} catch (error) {
				logger('error sending mail', error)
				throw new Error(
					this.localization.t('mutation.resetUserPassword.emailNotConfigured', locale)
				)
			}
		} else {
			logger('sendmail is not configured')
			// return temp password to display in console log.
			successMessage = `SUCCESS_NO_MAIL: account temporary password: ${password}`
		}

		this.telemetry.trackEvent('ResetUserPassword')
		return new SuccessUserResponse(successMessage, createGQLUser(user.item, true))
	}
}
