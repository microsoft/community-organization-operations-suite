/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'
import { memo, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ContainerLayout } from '~components/layouts/ContainerLayout'
import { PushNotifications } from '~components/ui/PushNotifications'
import { Footer } from '~components/ui/Footer'
import { ApplicationRoute } from '~types/ApplicationRoute'
import { LoadingPlaceholder } from '~ui/LoadingPlaceholder'
import styles from './AuthorizedRoutes.module.scss'

import NotFound from '~pages/404'
import Index from '~pages/index'
// removed lazy loading to force better offline behavior.
// only reenable to the extent that the offline mode will be caught with a fallback
import Account /* webpackChunkName: "AccountPage" */ from '~pages/account'
import Clients /* webpackChunkName: "ClientsPage" */ from '~pages/clients'
import Specialist /* webpackChunkName: "SpecialistPage" */ from '~pages/specialist'
import Reporting /* webpackChunkName: "ReportingPage" */ from '~pages/reporting'
import Tags /* webpackChunkName: "TagsPage" */ from '~pages/tags'
import ServicesIndex /* webpackChunkName: "ServicesIndexPage" */ from '~pages/services'
import AddService /* webpackChunkName: "AddServicePage" */ from '~pages/services/addService'
import EditService /* webpackChunkName: "EditServicePage" */ from '~pages/services/editService'
import ServiceEntry /* webpackChunkName: "ServiceEntryPage" */ from '~pages/services/serviceEntry'

export const AuthorizedRoutes: FC = memo(function AuthorizedRoutes() {
	return (
		<Switch>
			<Route path={ApplicationRoute.ServiceKioskMode} component={ServiceEntry} />
			<>
				<div className={styles.appContainer}>
					<ContainerLayout>
						<PushNotifications />
						<Suspense fallback={<LoadingPlaceholder />}>
							<Switch>
								<Route exact path={ApplicationRoute.Index} component={Index} />
								<Route path={ApplicationRoute.Account} component={Account} />
								<Route path={ApplicationRoute.Clients} component={Clients} />
								<Route path={ApplicationRoute.Specialist} component={Specialist} />
								<Route path={ApplicationRoute.Reporting} component={Reporting} />
								<Route path={ApplicationRoute.Tags} component={Tags} />
								<Route exact path={ApplicationRoute.Services} component={ServicesIndex} />
								<Route path={ApplicationRoute.AddService} component={AddService} />
								<Route path={ApplicationRoute.EditService} component={EditService} />
								<Route path={ApplicationRoute.ServiceEntry} component={ServiceEntry} />
								{/* Slash path matches all. It's used as a catch-all here for not-found routes */}
								<Route path={ApplicationRoute.Index} component={NotFound} />
							</Switch>
						</Suspense>
					</ContainerLayout>
					<Footer />
				</div>
			</>
		</Switch>
	)
})
