/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/*!
 * Borrowed from https://github.com/helfer/apollo-link-queue
 * to solve a build issue with importing normally.
 */

import type { Operation, FetchResult, NextLink } from '@apollo/client/link/core';
import { ApolloLink } from '@apollo/client/link/core'
import type { Observer } from '@apollo/client/utilities/';
import { Observable } from '@apollo/client/utilities/'

interface OperationQueueEntry {
	operation: Operation
	forward: NextLink
	observer: Observer<FetchResult>
	subscription?: { unsubscribe: () => void }
}

export default class QueueLink extends ApolloLink {
	private opQueue: OperationQueueEntry[] = []
	private isOpen = true

	public open() {
		this.isOpen = true
		this.opQueue.forEach(({ operation, forward, observer }) => {
			forward(operation).subscribe(observer)
		})
		this.opQueue = []
	}

	public close() {
		this.isOpen = false
	}

	public request(operation: Operation, forward: NextLink) {
		if (this.isOpen) {
			return forward(operation)
		}
		if (operation.getContext().skipQueue) {
			return forward(operation)
		}
		return new Observable<FetchResult>((observer: Observer<FetchResult>) => {
			const operationEntry = { operation, forward, observer }
			this.enqueue(operationEntry)
			return () => this.cancelOperation(operationEntry)
		})
	}

	private cancelOperation(entry: OperationQueueEntry) {
		this.opQueue = this.opQueue.filter((e) => e !== entry)
	}

	private enqueue(entry: OperationQueueEntry) {
		this.opQueue.push(entry)
	}
}
