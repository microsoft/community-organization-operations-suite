/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import 'reflect-metadata'
import config, { IConfig } from 'config'
import { singleton } from 'tsyringe'
import { createLogger } from '~utils'
import { version } from '../../.version.json'

const logger = createLogger('configuration')

/**
 * Server Configuration
 */
@singleton()
export class Configuration {
	private readonly c: IConfig

	public constructor() {
		this.c = config
	}

	/**
	 * Validate that required environment variables have bene set
	 */
	public validate(): void {
		if (this.dbConnectionString == null) {
			throw new Error('DB_CONNECTION_STRING must be defined')
		}
		if (this.jwtSecret == null) {
			throw new Error('JWT_SECRET must be defined')
		}
		if (!this.sendgridApiKey) {
			logger('SENDGRID_API_KEY is not set, mail disabled')
		}
		if (!this.defaultFromAddress) {
			logger('EMAIL_FROM is not set, mail disabled')
		}
		if (!this.telemetryKey) {
			logger('TELEMETRY_KEY is not set, telemetry disabled')
		}
	}

	public get version(): string {
		return version
	}

	public get debug() {
		return this.c.get<boolean>('server.debug')
	}

	public get introspection(): boolean | undefined {
		return this.c.get<boolean | undefined>('server.introspection')
	}

	public get port(): number {
		return this.c.get<number>('server.port')
	}

	public get host(): string {
		return this.c.get<string>('server.host')
	}

	public get origin(): string {
		return this.c.get<string>('server.origin')
	}

	public get prettyLogging(): boolean {
		return this.c.get<boolean>('logging.pretty')
	}

	public get dbConnectionString(): string {
		return this.c.get<string>('db.connectionString')
	}

	public get dbDatabase(): string {
		return this.c.get<string>('db.database')
	}

	public get dbUsersCollection(): string {
		return this.c.get<string>('db.usersCollection')
	}

	public get dbOrganizationsCollection(): string {
		return this.c.get<string>('db.organizationsCollection')
	}

	public get dbEngagementsCollection(): string {
		return this.c.get<string>('db.engagementsCollection')
	}

	public get dbTagsCollection(): string {
		return this.c.get<string>('db.tagsCollection')
	}

	public get dbContactsCollection(): string {
		return this.c.get<string>('db.contactsCollection')
	}

	public get dbServicesCollection(): string {
		return this.c.get<string>('db.servicesCollection')
	}

	public get dbServiceAnswerCollection(): string {
		return this.c.get<string>('db.serviceAnswerCollection')
	}

	public get dbAutoMigrate(): boolean {
		return this.c.get<boolean>('db.automigrate')
	}

	public get dbSeedMockData(): boolean {
		return this.c.get<boolean>('db.seedMockData')
	}

	public get dbSeedConnectionString(): string {
		return this.c.get<string>('db.seedConnectionString')
	}

	public get defaultPageOffset(): number {
		return this.c.get<number>('constants.defaultPageOffset')
	}

	public get defaultPageLimit(): number {
		return this.c.get<number>('constants.defaultPageLimit')
	}

	public get jwtSecret(): string {
		return this.c.get<string>('security.jwtSecret')
	}

	public get authTokenExpiry(): string | number {
		return this.c.get<string | number>('security.authTokenExpiry')
	}

	public get passwordResetTokenExpiry(): string | number {
		return this.c.get<string | number>('security.passwordResetTokenExpiry')
	}

	public get sendgridApiKey(): any {
		return this.c.get<string>('email.sendgridApiKey')
	}

	public get defaultFromAddress(): string {
		return this.c.get<string>('email.from')
	}

	public get firebaseCredentials(): any {
		const fbCreds = this.c.get<string | null>('firebase.credentials')
		return fbCreds == null ? null : JSON.parse(Buffer.from(fbCreds, 'base64').toString('utf8'))
	}

	public get failOnMailNotEnabled(): boolean {
		return this.c.get<boolean>('email.failOnMailNotEnabled')
	}

	public get isEmailEnabled(): boolean {
		return !!this.sendgridApiKey
	}

	public get telemetryKey(): string | null {
		return this.c.get<string | null>('telemetry.key')
	}
}
