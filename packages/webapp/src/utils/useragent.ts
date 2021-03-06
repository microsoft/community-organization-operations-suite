/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export const isChrome = () => navigator.userAgent.toLowerCase().indexOf('chrome') > -1
export const isSafari = () => navigator.userAgent.toLowerCase().indexOf('safari') > -1
export const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1
